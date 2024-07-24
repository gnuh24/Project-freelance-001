import axios from 'axios'

const Bear = localStorage.getItem('token') || null
const AxiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${Bear}`,
  },
})
export default AxiosAdmin
