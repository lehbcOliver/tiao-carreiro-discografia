import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tiao.supliu.com.br/api',
  headers: {
    'Authorization': 'lehbc.oliver@gmail.com'
  }
})