import { DataGrid, GridRowEditStopReasons } from '@mui/x-data-grid';
import type { GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const statusOptions = [
  { value: 'inProgress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220, editable: false },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'description', headerName: 'Description', width: 200, editable: true },
  { field: 'price', headerName: 'Price', width: 120, editable: true, type: 'number' },
  { field: 'creator', headerName: 'Creator', width: 150, editable: true },
  { field: 'status', headerName: 'Status', width: 120, editable: true, type: 'singleSelect', valueOptions: statusOptions },
];

export default function JobsDataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newJob, setNewJob] = useState({ name: '', description: '', price: '', creator: '', status: 'inProgress' });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const fetchJobs = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('accessToken');
    fetch('/api/v1/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then((data) => {
        setRows(data.map((row: any) => ({ ...row, id: row._id })));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRowEditStop = (params: any, event: any) => {
    if (event.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (newRow: any) => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`/api/v1/jobs/${newRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newRow.name,
          description: newRow.description,
          price: newRow.price,
          creator: newRow.creator,
          status: newRow.status,
        }),
      });
      if (!res.ok) throw new Error('Failed to update job');
      setSuccess('Job updated successfully!');
      fetchJobs();
      return { ...newRow };
    } catch (err: any) {
      setError(err.message || 'Failed to update job');
      throw err;
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleDialogSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setNewJob({ ...newJob, status: e.target.value as string });
  };

  const handleCreateJob = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch('/api/v1/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error('Failed to create job');
      setSuccess('Job created successfully!');
      setOpenDialog(false);
      setNewJob({ name: '', description: '', price: '', creator: '', status: 'inProgress' });
      fetchJobs();
    } catch (err: any) {
      setError(err.message || 'Failed to create job');
    }
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={handleDialogOpen}>
        Create Job
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        loading={loading}
        processRowUpdate={processRowUpdate}
        onRowEditStop={handleRowEditStop}
        editMode="row"
      />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Create Job</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
          <TextField label="Name" name="name" value={newJob.name} onChange={handleDialogChange} fullWidth required />
          <TextField label="Description" name="description" value={newJob.description} onChange={handleDialogChange} fullWidth required />
          <TextField label="Price" name="price" value={newJob.price} onChange={handleDialogChange} type="number" fullWidth required />
          <TextField label="Creator" name="creator" value={newJob.creator} onChange={handleDialogChange} fullWidth required />
          <TextField
            select
            label="Status"
            name="status"
            value={newJob.status}
            onChange={handleDialogChange}
            fullWidth
          >
            {statusOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateJob} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>{error}</Alert>
      </Snackbar>
    </div>
  );
} 