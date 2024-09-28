import axios from 'axios'
import Cookies from 'js-cookie'

const Bear = Cookies.get('token') || null

const AxiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${Bear}`,
  },
})
export default AxiosAdmin
