import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'job', headerName: 'Job', width: 180 },
  { field: 'text', headerName: 'Text', width: 250 },
  { field: 'status', headerName: 'Status', width: 120 },
];

export default function MyProposals() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoading(true);
    setError(null);
    fetch('/api/v1/proposals', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch proposals');
        return res.json();
      })
      .then(data => {
        // Map _id to id for DataGrid
        setRows(data.map((row: any) => ({ ...row, id: row._id })));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Proposals</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
        />
      )}
    </Box>
  );
} 