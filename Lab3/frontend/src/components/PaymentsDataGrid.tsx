import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid/models';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'job', headerName: 'Job', width: 150 },
  { field: 'user', headerName: 'User', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 120 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const mockPayments = [
  { id: '1', job: 'Job 1', user: 'Alice', amount: 100, status: 'paid' },
  { id: '2', job: 'Job 2', user: 'Bob', amount: 200, status: 'pending' },
];

export default function PaymentsDataGrid() {
  const [rows, setRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    setRows(mockPayments);
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