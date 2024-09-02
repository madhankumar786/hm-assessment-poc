import { useMutation } from "react-query";
import { apiClients } from "utils";

const addDashboard = (data) => {
    return apiClients.service1Api.post('/dashboard',data)
    .then(response => {
      console.log('response from addDashboard:', response.data)
      return response;
    } )
    .catch(error => {
      console.error('Error from addDashboard:', error)
    });
}

const useAddDashboardChart = (onSuccess, onError) => {
  return useMutation(addDashboard, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export default useAddDashboardChart;
