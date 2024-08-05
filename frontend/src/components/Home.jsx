import React, { useEffect, useState, useMemo } from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {

  const [myData, setMyData] = useState([])
  const [loading, setLoading] = useState(true)

  const getData=()=>{
    AxiosInstance.get(`project/`).then((res)=>{
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData()
  },[])


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'projectmanager', //access nested data with dot notation
        header: 'Manager Name',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'comments', //normal accessorKey
        header: 'Comments',
        size: 200,
      },
      {
        accessorFn:(row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
        header: 'Start Date',
        size: 150,
      },
      {
        accessorFn:(row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
        header: 'End Date',
        size: 150,
      },
    ],
    [],
  );

  return (
    <div> 
      {loading ? <p> Loading data.. </p>:
         <MaterialReactTable 
            columns={columns} 
            data={myData} 
            
            enableRowActions
            renderRowActions={({row}) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                
                <IconButton
                  component={Link} to={`edit/${row.original.id}`}
                  color="secondary"
                  > 
                  {/* {console.log(row.original.id)} */}
                  <EditIcon />
                </IconButton>

                <IconButton
                  component={Link} to={`delete/${row.original.id}`}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            
            
        />
      }
    </div>
  )
}

export default Home;