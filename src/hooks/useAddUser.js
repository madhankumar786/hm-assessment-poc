import { useMutation } from "react-query";
import axios from 'axios';

const addUser = (user) => {
    return axios.post('http://localhost:7000/users',user)
}

export const useAddUser = (onSuccess, onError) => {
    return useMutation(addUser, {
        onSuccess: (data) => {
          if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
          if (onError) onError(error);
        },
      })
}