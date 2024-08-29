import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:7000',
    timeout: 5000, // 5 seconds
    headers: {
      'Authorization': 'Bearer my-token',
      'Content-Type': 'application/json'
    }
  });
  
  // Using the instance for requests
  apiClient.get('/data')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  