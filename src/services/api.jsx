import axios from 'axios';

const api = axios.create({
    baseURL: 'https://chat-crng.onrender.com/'
})

export default api;