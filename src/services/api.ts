import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@LogWorking:token');

  if (config && config.headers && token) {
    config.headers.Authorization =  'Bearer ' + token;
  }

  return config;
});

export default api;