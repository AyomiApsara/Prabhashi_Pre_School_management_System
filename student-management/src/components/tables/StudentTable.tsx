
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import MaterialReactTable, { MRT_Row, type MRT_ColumnDef } from 'material-react-table';
import { Student } from '../../models/student';
import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Auth } from '../../models/Auth';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import { Parent } from '../../models/parent';


interface StudentTableProps {
  loadStudents: (pageSize:number, pageNumber:number,auth:Auth) => Promise<Array<Student>>;
  setOpenStudentModal: (student:Student) => void;
  deleteStudent: (studentId:string,auth:Auth) => Promise<void>;
}

const StudentTable = (props:StudentTableProps) => {
  const [st, setSts] = useState<Array<Student>>([]);
  const [students, setStudents] = useState<Array<Student>>([]);
  const [loading, setLoading] = useState(true);
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    props.loadStudents(10,0,auth)
      .then((usrs: Array<Student>) => {
        
        setStudents(usrs);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading students:', error);
        if(error.response.status == 403){
          navigate("/login")
        }
        setLoading(false);
      });
  }, [st]);


  
  const handleDeleteRow = useCallback(
    (row: MRT_Row<Student>) => {
      // if (
      //   !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      // ) {
      //   return;
      // }
      //send api delete request here, then refetch or update local table data for re-render
      props.deleteStudent(row.getValue('studentId'),auth)
      students.splice(row.index, 1);
      setStudents([...students]);
    },
    [students],
  );
  
  const columns = React.useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: 'studentId',
        header: 'Student Id',
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
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'birthday',
        header: 'Birthday',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'nation',
        header: 'Nationality',
      },
      {
        accessorKey: 'religion',
        header: 'Religion',
      },
    ],
    [],
  );
  
  
const convertRowToStudent = (row:any) => {
  return {
    studentId: row.getValue('studentId'),
    fName: row.getValue('fName'),
    lName: row.getValue('lName'),
    fullname: row.getValue('fullname'),
    gender: row.getValue('gender'),
    birthday: row.getValue('birthday'),
    address: row.getValue('address'),
    nation: row.getValue('nation'),
    religion: row.getValue('religion'),
    regyear: row.getValue('regyear'),
    pNote: row.getValue('pNote'),
    gradeId: row.getValue('gradeId'),
    parent:new Parent()
  };
};
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
         <MaterialReactTable columns={columns} data={students}   enableEditing
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton  onClick={() => props.setOpenStudentModal(convertRowToStudent(row))}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )} />
      </Paper>
    
    </Box>
  );
}

export default StudentTable