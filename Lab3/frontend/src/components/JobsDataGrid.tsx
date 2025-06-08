import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'creator', headerName: 'Creator', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const mockJobs = [
  { id: '1', name: 'Job 1', description: 'Desc 1', price: 100, creator: 'Alice', status: 'inProgress' },
  { id: '2', name: 'Job 2', description: 'Desc 2', price: 200, creator: 'Bob', status: 'completed' },
];

export default function JobsDataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    setRows(mockJobs);
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