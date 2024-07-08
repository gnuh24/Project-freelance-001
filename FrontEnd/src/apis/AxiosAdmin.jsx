import axios from 'axios'

// const Bear = JSON.parse(localStorage.getItem('user'))?.accessToken
const AxiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   Authorization: `Bearer ${Bear}`,
  // },
})
export default AxiosAdmin
