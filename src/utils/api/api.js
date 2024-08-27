import axios from 'axios';

const missingFetchParameters = 'Missing fetch parameters';

const utilsApi = {
  get: async ({ endpoint, path, params, headers = true, isTokenRequired }) => {
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
        return localStorage.getItem('accessToken');
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
