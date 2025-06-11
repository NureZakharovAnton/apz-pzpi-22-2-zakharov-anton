import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'job', headerName: 'Job', width: 150 },
  { field: 'user', headerName: 'User', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 120 },
  { field: 'status', headerName: 'Status', width: 120 },
];

export default function PaymentsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoading(true);
    setError(null);
    fetch('/api/v1/payments', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch payments');
        return res.json();
      })
      .then(data => setRows(data.map((payment: any) => ({ ...payment, id: payment._id }))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Payments</Typography>
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