// useUpdateChart.js
import { useMutation } from 'react-query';
import axios from 'axios';
import { apiClients } from 'utils';

// Custom hook for updating a chart
const updateDashboard = (data) => {
  return apiClients.service1Api.put(`/dashboard/${data.id}`,data)
  .then(response => {
    console.log('response from addDashboard:', response.data)
    return response;
  } )
  .catch(error => {
    console.error('Error from addDashboard:', error)
  });
}
const useUpdateChart = (onSuccess, onError) => {
  return useMutation(updateDashboard, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
  //   const updateChart = async (chartData) => { 
  //   await axios.put(`http://localhost:7000/dashboard/${chartData.id}`, chartData);
  // };
  // return useMutation(updateChart, {
  //   onSuccess, 
  //   onError,   
  // });
};

export default useUpdateChart;
