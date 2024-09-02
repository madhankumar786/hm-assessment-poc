import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const utilsClientsApi = {
service1Api : axios.create({
  baseURL: "http://localhost:7000",
  timeout: 5000,
  headers: {
    'Authorization': accessToken,
    "Content-Type": "application/json",
  },
})
}

export default  utilsClientsApi;
