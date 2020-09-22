import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44360/funcionarios',
});

export default api;
