import axios from 'axios';

const instance = axios.create({
  baseURL: "https://contactmanager1-t5jh.onrender.com/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
