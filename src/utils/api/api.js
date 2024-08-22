import axios from 'axios';

const missingFetchParameters = 'Missing fetch parameters';

const utilsApi = {
  get: async ({ endpoint, path, params, headers = true, isTokenRequired = true }) => {
    if (!endpoint) return Promise.reject({ message: missingFetchParameters });
    const token = isTokenRequired ? accessToken() : null;

    return await axios.get(getUrl(endpoint, path, params), {
      headers: headers ? getHeaders(token) : {},
    });
  },
  post: ({ endpoint, path, params, data, headers = true, isTokenRequired = true }) => {
    if (!endpoint) return Promise.reject({ message: missingFetchParameters });
    const token = isTokenRequired ? accessToken() : null;

    return axios.post(
      getUrl(endpoint, path, params),
      {
        ...data,
      },
      {
        headers: headers ? getHeaders(token) : {},
      }
    );
  },
 
  put: ({ endpoint, path, params, data, headers = true, isTokenRequired = true }) => {
    if (!endpoint) return Promise.reject({ message: missingFetchParameters });
    const token = isTokenRequired ? accessToken() : null;

    return axios.put(
      getUrl(endpoint, path, params),
      {
        ...data,
      },
      {
        headers: headers ? getHeaders(token) : {},
      }
    );
  },
 
 
  delete: ({ endpoint, path, params, headers = true, isTokenRequired = true }) => {
    if (!endpoint) return Promise.reject({ message: missingFetchParameters });
    const token = isTokenRequired ? accessToken() : null;

    return axios.delete(getUrl(endpoint, path, params), {
      headers: headers ? getHeaders(token) : {},
    });
  },

};

export const accessToken = () => {
    if(localStorage.getItem('accessToken')){
        return "eyJraWQiOiJQNEFWUmtoM2RCTUs2VXd3RnZ1cjgwZ0srcGVMTzZpUHlzUUFZQVFoWm1FPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiUnlsZEQzdS1tZDdmWUxmVTdLa2lqZyIsInN1YiI6IjVkZGIyOWQ1LTUzMDEtNGZjMi1hNjgyLTVhY2ExZThkNGJjMyIsImNvZ25pdG86Z3JvdXBzIjpbImFwLXNvdXRoLTFfOFZ3ZjVBQlBxX01TSUwtQ09NTU9OLUFEIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfOFZ3ZjVBQlBxIiwic2RrOmF1dGhlbnRpY2F0aW9uRmxvd1R5cGUiOiJVU0VSX1NSUF9BVVRIIiwic2RrOnVzZXJQb29sV2ViQ2xpZW50SWQiOiI0Nm9yaXZxcWM4bG5kNWVuYWxtZHNidDE1YSIsInNkazpnYXRld2F5VXJsIjoiaHR0cHM6XC9cL3d3dy5jZi5tYXJ1dGlzdXp1a2lzdWJzY3JpYmUuY29tXC8iLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiJNQVJVVElcXEhhcHBpZXN0bWluZHNfU2FwYW5hIiwicHJvdmlkZXJOYW1lIjoiTVNJTC1DT01NT04tQUQiLCJwcm92aWRlclR5cGUiOiJTQU1MIiwiaXNzdWVyIjoiaHR0cDpcL1wvQURGUy5NYXJ1dGkuY28uaW5cL2FkZnNcL3NlcnZpY2VzXC90cnVzdCIsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNjc3NjQ4ODMwMDM1In1dLCJhdXRoX3RpbWUiOjE3MDQxODUzNDIsInNkazphdXRoU2VydmVyVXJsIjoiaHR0cHM6XC9cL3d3dy5jZi5tYXJ1dGlzdXp1a2lzdWJzY3JpYmUuY29tXC8iLCJleHAiOjE3MDQxODg5NDIsImlhdCI6MTcwNDE4NTM0MiwianRpIjoiNjlkMzhiZDYtOTZlNC00YzI3LWIyOTEtODY5YTYyNWZlMjVhIiwiZW1haWwiOiJIYXBwaWVzdG1pbmRzX1NhcGFuYS5WeWF2YWhhcmVAbWFydXRpLmNvLmluIiwic2RrOnVzZXJQb29sSWQiOiJhcC1zb3V0aC0xXzhWd2Y1QUJQcSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ3JvdXBzIjoiIiwiY29nbml0bzp1c2VybmFtZSI6Im1zaWwtY29tbW9uLWFkX21hcnV0aVxcaGFwcGllc3RtaW5kc19zYXBhbmEiLCJub25jZSI6Ikx4dUVDYjRHV3BhMFVZT29JYy1YV2pqWDFlS3JLeHZURVZleXA4QVF3NTJFX2NPVDVGSHlzWUxxbkJ6Wms3LXJHX0dKcmJHNFdmbGctbTc5aHNMd0xyd0dIa1NaYUhUdWRhQUNKRjEtaDE2S20xZFlyV0lJUXdqRjBBWFRIYXF0ZDRiYmlwcnIxclFDSTlrT0RVSWhka1hmSURlLUVweURFeVNCZi1xaFNobyIsInNkazpkb21haW4iOiJNU0lMLUNPTU1PTi1BRCIsIm9yaWdpbl9qdGkiOiJhODkwZTAzMC02NTcyLTRmMWQtYTUwZC0yNDc4N2MyZTlkNmIiLCJhdWQiOiI0Nm9yaXZxcWM4bG5kNWVuYWxtZHNidDE1YSIsInRva2VuX3VzZSI6ImlkIiwic2RrOmF1dGhTZXJ2ZXIiOiJtc2lsLWFkZnMtYXV0aC1zZXJ2ZXIuYXV0aC5hcC1zb3V0aC0xLmFtYXpvbmNvZ25pdG8uY29tIiwic2RrOnJlZ2lvbiI6ImFwLXNvdXRoLTEifQ.Y1am3JUNG41L0ogwwCYBGkJ9PhcVQfSbi2tJgH1yqPfPncraXl0X8uj0iQ4gIQNcGVyN748hZf_3nP2Kzq5inSw_nxjfEDzH9Zh0nW2ESYyA7tv75Q21b2ZGFEycLN-r3soxTi5DaNM2WSX4hjCNjakDv-T37s4sUtHGEFY65J_YL-oKZh0Yst96DLrrjMvB-wICN_NpZgo8fuoM2RkVYPD5jHSCZMowbJ09w-6xiudTiBtxy5G6u9xxJmUiUmaSTILC-Blt5-hQTMNVg3VBnUSuKN9utVz60ujrQsyd4M7uaJ7ANgg_6PaGIhWAM8JFPMN15D7L37SW8hmyLPA7xg";
    }
};

export const getUrl = (endpoint, path, params) => {
  const apiPath = path ? `/${path}` : '';
  if (!endpoint) return '';
  return `${endpoint}${apiPath}${getQueryString(params)}`;
};

export const getQueryString = (params) => {
  const isObject = params !== null && typeof params === 'object' && Array.isArray(params) === false;

  if (!isObject) return '';

  const paramsArray = Object.entries(params).map((param) => {
    return Array.isArray(param[1])?`${param[0]}=${JSON.stringify(param[1])}`:`${param[0]}=${param[1]}`;
  });
  return paramsArray.length > 0 ? `?${paramsArray.join('&')}` : '';
};

export const getHeaders = (token, type = 'json') => {
  return {
    ...(type === 'json' && { 'Content-Type': 'application/json' }),
    ...(type === 'multipart' && { 'Content-Type': 'multipart/form-data' }),
    ...(token && { Authorization: token }),
  };
};

export default utilsApi;
