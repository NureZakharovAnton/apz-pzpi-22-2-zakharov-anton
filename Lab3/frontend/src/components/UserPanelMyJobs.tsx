import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'createdAt', headerName: 'Created At', width: 180 },
];

export default function MyJobs() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userId = payload?.sub;
    setLoading(true);
    setError(null);
    fetch(`/api/v1/jobs?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then(data => setRows(data.map((job: any) => ({ ...job, id: job._id, price: Number(job.price) }))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>My Jobs</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
} 