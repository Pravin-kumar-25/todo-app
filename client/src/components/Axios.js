import axios from 'axios';

const todoAPI = axios.create({
    withCredentials: true,
    // baseURL: "http://localhost:4000"
})

export default todoAPI