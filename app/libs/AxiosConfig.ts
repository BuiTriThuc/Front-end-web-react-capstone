import axios from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.API_URL;

const AxiosClient = axios.create({
  baseURL: 'https://holiday-swap.click/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
AxiosClient.interceptors.request.use(
  async function(config) {
    const session = await getSession();
    if (session && session?.user?.access_token && session.user?.access_token!=="") {
      config.headers.Authorization = `Bearer ${session?.user?.access_token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    // return Promise.reject(error);
  },
);


// Add a response interceptor
AxiosClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default AxiosClient;