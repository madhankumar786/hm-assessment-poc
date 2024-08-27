import React, { useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from 'utils';
import config from 'config/config';

const GitHubCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    if (codeParams && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        return api
          .get({
            endpoint: config.endpoint.internalService,
            path: "getAccessToken",
            params: {code:codeParams},
            isTokenRequired:"true"
          })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.access_token);
            console.log(response, "Response from getAccessToken api");
                  if (response.data.access_token) {
                    navigate('/');
                  }
          })
          .catch((error) => {
            console.log(error, "error from login get call");
          });
        
      };
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
