import axios from 'axios';

// URL do backend
export const api = axios.create({
  baseURL: 'http://localhost:8000', // ajuste se mudar a porta do uvicorn
  headers: {
    'Content-Type': 'application/json',
  },
});
