import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios';

const Delete = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id: MyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      console.log('Fetching data for ID:', MyId);
      AxiosInstance.get(`project/${MyId}`)
        .then((res) => {
          setMyData(res.data);
          console.log('Data fetched:', res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    getData();
  }, [MyId]);

  const submission = () => {
    console.log('Attempting to delete record with ID:', MyId);
    AxiosInstance.delete(`project/${MyId}/`)
      .then(() => {
        console.log('Record deleted successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data..</p>
      ) : (
        <div>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
              color: '#fff',
              padding: 2,
            }}
          >
            <Typography sx={{ marginLeft: '20px' }}>
              Delete Record: {myData.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '40px',
              }}
            >
              Are you sure that you want to delete record: {myData.name}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '30%',
              }}
            >
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: '100%' }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;