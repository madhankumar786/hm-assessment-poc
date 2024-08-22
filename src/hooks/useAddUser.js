import { useMutation } from "react-query";
import { api } from 'utils';
import config from '../config/config';

const addUser = (user) => {
    return api.post({
      endpoint: config.endpoint.baseServiceOne,
      path: 'users',
      data: user,
    })
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