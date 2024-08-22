import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api/api';

const GitHubCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchAccessToken = async () => {
    //   const params = new URLSearchParams(window.location.search);
    //   const code = params.get('code');

    //   if (code) {
    //     try {
    //       const response = await api.post('/github/callback', { code });
    //       const { access_token } = response.data;

    //       if (access_token) {
    //         localStorage.setItem('accessToken', access_token);
    //         navigate('/');
    //       } else {
    //         console.error('Failed to fetch access token');
    //       }
    //     } catch (error) {
    //       console.error('Error during GitHub OAuth callback', error);
    //     }
    //   }
    // };

    // fetchAccessToken();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    if (codeParams && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
              localStorage.setItem("accessToken", data.access_token);
            console.log(data, "data from getAccessToken");
            if (data.access_token) {
              navigate('/');
            }
          }).catch((error) => { console.log(error,'error from githubcallback component')})
      }
      getAccessToken();
    }
  }, [navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Typography variant="h6" gutterBottom>Processing...</Typography>
      <CircularProgress />
    </Box>
  );
};

export default GitHubCallback;
