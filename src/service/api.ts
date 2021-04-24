import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/mhrocha1997/plant-manager'
})

export default api;