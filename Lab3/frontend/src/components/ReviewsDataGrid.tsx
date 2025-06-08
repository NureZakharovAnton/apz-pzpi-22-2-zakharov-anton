import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'job', headerName: 'Job', width: 150 },
  { field: 'reviewer', headerName: 'Reviewer', width: 150 },
  { field: 'reviewee', headerName: 'Reviewee', width: 150 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'comment', headerName: 'Comment', width: 200 },
];

const mockReviews = [
  { id: '1', job: 'Job 1', reviewer: 'Alice', reviewee: 'Bob', rating: 5, comment: 'Great work!' },
  { id: '2', job: 'Job 2', reviewer: 'Bob', reviewee: 'Alice', rating: 4, comment: 'Good job.' },
];

export default function ReviewsDataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    setRows(mockReviews);
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
} 