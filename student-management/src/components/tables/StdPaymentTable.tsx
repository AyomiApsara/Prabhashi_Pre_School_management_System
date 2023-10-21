
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { StdPayment } from '../../models/stdPayment';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Auth } from '../../models/Auth';


interface StdPaymentTableProps {
  loadStdPayments: (pageSize:number, pageNumber:number,auth:Auth) => Promise<Array<StdPayment>>;
}

const StdPaymentTable = (props:StdPaymentTableProps) => {
  const [users, setStdPayments] = useState<Array<StdPayment>>([]);
  const [loading, setLoading] = useState(true);
  const { auth,setAuth } = useAuth();
  useEffect(() => {
    props.loadStdPayments(10,0,auth)
      .then((usrs: Array<StdPayment>) => {
        
        setStdPayments(usrs);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error loading users:', error);
        setLoading(false);
      });
  }, []);

  const columns = React.useMemo<MRT_ColumnDef<StdPayment>[]>(
    () => [
   
      {
        accessorKey: 'day',
        header: 'First Name',
      },
      {
        accessorKey: 'month',
        header: 'Last Name',
      },
      {
        accessorKey: 'year',
        header: 'Full Name',
      },
      {
        accessorKey: 'note',
        header: 'Gender',
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

export default StdPaymentTable