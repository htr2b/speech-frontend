import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' }
    ,
    withCredentials: true
})
api.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token')
    console.log(' Sending token:', token)
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    return cfg
})

export default api
