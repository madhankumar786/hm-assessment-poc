import { useQuery } from 'react-query';
import { apiClients } from "utils";

const getTableData = async () => {
  return await apiClients.service1Api
    .get("/tableData")
    .then((response) => {
      console.log(response, "response from login get call");
      return response.data;
    })
    .catch((error) => {
      console.log(error, "error from login get call");
    });
};

const useWidgetTableData = ({onSuccess, onError}) => {
    return useQuery( 
        {
          queryKey: ['widgetTableData'],
          queryFn: getTableData,
          onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
          if (onError) onError(error);
        },
      });
};

export default useWidgetTableData;
