
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';

import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_Row
} from 'material-react-table';
import { Attendance } from '../../models/attendance';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Auth } from '../../models/Auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
interface AttendanceTableProps {
  loadAttendances: (auth: Auth) => Promise<Array<Attendance>>;
}

const AttendanceTable = (props: AttendanceTableProps) => {
  const [attendance, setAttendances] = useState<Array<Attendance>>([]);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    props.loadAttendances(auth)
      .then((attndnces: Array<Attendance>) => {

        setAttendances(attndnces);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading attendance:', error);
        if (error.response.status == 403) {
          navigate("/login")
        }
        setLoading(false);
      });
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<Attendance>[]>(
    () => [

      {
        accessorKey: 'date',
        header: 'Date',
      }, {
        accessorKey: 'studentId',
        header: 'Student Id',
      },
      {
        accessorKey: 'Student.fullname',
        header: 'Student',
      },
    ],
    [],
  );


  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);


  const handleExportRows = (rows: MRT_Row<Attendance>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(attendance);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MaterialReactTable
          columns={columns}
          data={attendance}
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Attendence
              </Button>
             
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Attendance
              </Button>
            </Box>
          )}
        />
      
      </Paper>

    </Box>
  );
}

export default AttendanceTable