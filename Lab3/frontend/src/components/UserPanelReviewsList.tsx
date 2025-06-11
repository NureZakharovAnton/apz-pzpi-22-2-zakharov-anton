import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'job', headerName: 'Job', width: 150 },
  { field: 'reviewer', headerName: 'Reviewer', width: 150 },
  { field: 'reviewee', headerName: 'Reviewee', width: 150 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'comment', headerName: 'Comment', width: 200 },
];

export default function ReviewsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoading(true);
    setError(null);
    fetch('/api/v1/reviews', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(data => setRows(data.map((review: any) => ({ ...review, id: review._id }))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Reviews</Typography>
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