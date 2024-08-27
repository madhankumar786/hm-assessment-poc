import { useMutation } from "react-query";
import { api } from "utils";
import * as utils from 'utils';
import config from "../config/config";

const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
  return await api
    .get({
      endpoint: config.endpoint.baseServiceOne,
      path: "users",
      isTokenRequired:"true"
    })
    .then((response) => {
      console.log(response, "response from login get call");
      const users = response.data;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log(user, "user from authenicateUser");
      if (!user) {
        throw new Error("Invalid email or password");
      }
      if(user.email){
        utils.generic.generateAccessToken(user.email).then(res => 
          {
            localStorage.setItem('accessToken',res)
          })
      }
      return user;
    })
    .catch((error) => {
      console.log(error, "error from login get call");
    });
  
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
