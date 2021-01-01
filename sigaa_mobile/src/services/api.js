import axios from 'axios'

const api = axios.create({
    baseURL: 'https://csigaa.herokuapp.com/'
    // baseURL: 'http://localhost:3000/'
})

export default api;

