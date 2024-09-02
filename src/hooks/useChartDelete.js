import { useMutation } from 'react-query';
import axios from 'axios';

const useChartDelete = (onSuccess, onError) => {
  // Function to delete the chart by ID
  const deleteChart = async (id) => {
    await axios.delete(`http://localhost:7000/dashboard/${id}`);
  };

  // Use useMutation to handle the deletion API call
  return useMutation(deleteChart, {
    onSuccess,
    onError,
  });
};

export default useChartDelete;
