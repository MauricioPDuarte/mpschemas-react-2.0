import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  localStorage.clear();
  window.dispatchEvent(new Event("storage"));
  return Promise.reject(error);
});


api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@MPSchemas:token');

  if (config && config.headers && token) {
    config.headers.Authorization =  'Bearer ' + token;
  }

  return config;
});




export default api;