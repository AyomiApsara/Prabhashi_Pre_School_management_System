
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Grade } from '../../models/grade';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Auth } from '../../models/Auth';
import { useNavigate } from 'react-router-dom';


interface GradeTableProps {
  loadGrades: (authauth:Auth) => Promise<Array<Grade>>;
}

const GradeTable = (props:GradeTableProps) => {
  const [users, setGrades] = useState<Array<Grade>>([]);
  const [loading, setLoading] = useState(true);
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    props.loadGrades(auth)
      .then((usrs: Array<Grade>) => {
        
        setGrades(usrs);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading users:', error);
        if(error.response.status == 403){
          navigate("/login")
        }
        setLoading(false);
      });
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<Grade>[]>(
    () => [
   
      {
        accessorKey: 'gradeName',
        header: 'Class',
      },
      {
        accessorKey: 'Teacher.fullname',
        header: 'Teacher Full Name',
      },
      
    ],
    [],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
         <MaterialReactTable columns={columns} data={users} />
      </Paper>
    
    </Box>
  );
}

export default GradeTable