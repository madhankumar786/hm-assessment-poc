import { useMutation } from "react-query";
import { apiClients } from 'utils';

const addUser = (user) => {
    return apiClients.service1Api.post('/users',user)
    .then(response => {
      console.log('Service 2 Fixed Instance Response:', response.data)
      return response;
    } )
    .catch(error => {
      console.error('Service 2 Fixed Instance Error:', error)
    });
}

const useAddUser = (onSuccess, onError) => {
    return useMutation(addUser, {
        onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
          if (onError) onError(error);
        },
      })
}

export default useAddUser;