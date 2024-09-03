import { useMutation } from 'react-query';
import axios from 'axios';

const useChartDelete = (onSuccess, onError) => {
  const deleteChart = async (id) => {
    await axios.delete(`http://localhost:7000/dashboard/${id}`);
  };

  return useMutation(deleteChart, {
    onSuccess,
    onError,
  });
};

export default useChartDelete;
