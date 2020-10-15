import axios from 'axios'

const api = axios.create({
    baseURL: 'https://csigaa.herokuapp.com/'
})

export default api;