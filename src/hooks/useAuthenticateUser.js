import { useMutation } from 'react-query';
import axios from 'axios';

const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
  const response = await axios.get('http://localhost:7000/users');
  const users = response.data;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
};

const useAuthenticateUser = (onSuccess, onError) => {
  return useMutation(authenticateUser, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export default useAuthenticateUser;
