// src/hooks/useGetDashboardCharts.js
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCharts, setLoading, setError } from '../store/chartsSlice'; // Import actions
import { apiClients } from 'utils';

const fetchDashboardCharts = async () => {
return apiClients.service1Api
    .get("/dashboard")
    .then((response) => {
      console.log(response, "response from getDashboard api call");
      return response;
    })
    .catch((error) => {
      console.log(error, "error from getDashboard api call");
    });
};

// Custom hook to get dashboard charts, with onSuccess and onError as parameters
 const useGetDashboardCharts = ({ onSuccess, onError }) => {
  // const dispatch = useDispatch();
  return useQuery( 
    {
      queryKey: ['dashboardCharts'],
      queryFn: fetchDashboardCharts,
      onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export default useGetDashboardCharts;