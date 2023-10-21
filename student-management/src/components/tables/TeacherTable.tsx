
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import MaterialReactTable, { MRT_Cell, MRT_Row, MaterialReactTableProps, type MRT_ColumnDef } from 'material-react-table';
import { Teacher } from '../../models/teacher';
import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Auth } from '../../models/Auth';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { Tooltip, IconButton, Button } from '@mui/material';


interface TeacherTableProps {
  loadTeachers: (authauth:Auth) => Promise<Array<Teacher>>;
  setOpenTeacherModal: (teacher:Teacher) => void;
}

const TeacherTable = (props:TeacherTableProps) => {
  const [teachers, setTeachers] = useState<Array<Teacher>>([]);
  const [loading, setLoading] = useState(true);
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    props.loadTeachers(auth)
      .then((usrs: Array<Teacher>) => {
        
        setTeachers(usrs);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading teachers:', error);
        if(error.response.status == 403){
          navigate("/login")
        }
        setLoading(false);
      });
  }, []);


  // edit delete functions




  const handleDeleteRow = useCallback(
    (row: MRT_Row<Teacher>) => {
      // if (
      //   !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      // ) {
      //   return;
      // }
      //send api delete request here, then refetch or update local table data for re-render
      teachers.splice(row.index, 1);
      setTeachers([...teachers]);
    },
    [teachers],
  );

  
  // edit dlete function
  const columns = React.useMemo<MRT_ColumnDef<Teacher>[]>(
    () => [
   
    {
      accessorKey: 'teacherId',
      header: 'Teacher Id',
    },
      {
        accessorKey: 'fName',
        header: 'First Name',
      },
      {
        accessorKey: 'lName',
        header: 'Last Name',
      },
      {
        accessorKey: 'fullname',
        header: 'Full Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'teacherNIC',
        header: 'TeacherNIC',
      },
      {
        accessorKey: 'teacherNo',
        header: 'TeacherNo',
      },
      {
        accessorKey: 'teacherEmail',
        header: 'TeacherEmail',
      },
      {
        accessorKey: 'regDate',
        header: 'RegDate',
      },
    ],
    [],
  );
  const convertRowToTeacher = (row:any) => {
    return {
      teacherId: row.getValue('teacherId'),
      fName: row.getValue('fName'),
      lName: row.getValue('lName'),
      fullname: row.getValue('fullname'),
      address: row.getValue('address'),
      teacherNIC: row.getValue('teacherNIC'),
      teacherNo: row.getValue('teacherNo'),
      teacherEmail: row.getValue('teacherEmail'),
      regDate: row.getValue('regDate'),
    };
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
         <MaterialReactTable columns={columns} data={teachers} 
          enableEditing
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton  onClick={() => props.setOpenTeacherModal(convertRowToTeacher(row))}>
                  <Edit />
                </IconButton>
              </Tooltip>
              {/* <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip> */}
            </Box>
          )}
         />
      </Paper>
    
    </Box>
  );
}

export default TeacherTable