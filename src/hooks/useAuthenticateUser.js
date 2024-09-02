import { useMutation } from 'react-query';
import { apiClients } from "utils";
import * as utils from "utils";

const authenticateUser = async (credentials) => {
  const { email, password } = credentials;

  return await apiClients.service1Api
    .get("/users")
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
      if (user.email) {
        utils.generic.generateAccessToken(user.email).then((res) => {
          localStorage.setItem("accessToken", res);
        });
      }
      return user;
    })
    .catch((error) => {
      console.log(error, "error from login get call");
    });
};

const useAuthenticateUser = (onSuccess, onError) => {
  return useMutation({mutationFn:authenticateUser,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};

export default useAuthenticateUser;
