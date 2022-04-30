import axios from 'axios';

const todoAPI = axios.create({
    withCredentials: true,
    baseURL: "https://pravintodoapp.herokuapp.com/"
})

export default todoAPI