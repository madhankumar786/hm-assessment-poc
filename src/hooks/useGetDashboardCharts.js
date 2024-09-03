import { useQuery } from 'react-query';
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

 const useGetDashboardCharts = ({ onSuccess, onError }) => {
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