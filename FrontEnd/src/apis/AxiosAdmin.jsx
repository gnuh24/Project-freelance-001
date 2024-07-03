import axios from 'axios'

// const Bear = JSON.parse(localStorage.getItem('user'))?.accessToken
const AxiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   Authorization: `Bearer ${Bear}`,
  //   TokenCybersoft:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NjAzMjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk2MTc5NjAwfQ.i6JqYnGkwyHl6dkDHnjFWbPfBEl2l4SXAp4r7h9Ecpw',
  // },
})
export default AxiosAdmin
