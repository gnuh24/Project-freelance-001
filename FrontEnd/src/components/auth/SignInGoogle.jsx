import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { alertError } from '../sweeetalert/sweetalert'
import Cookies from 'js-cookie'

const SignInGoogle = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')
    const email = queryParams.get('email')
    const token = queryParams.get('token')
    const refreshToken = queryParams.get('refreshToken')

    // Lưu vào local storage
    if (id && email && token && refreshToken) {
      Cookies.set('id', id, { expires: 7 })
      Cookies.set('email', email, { expires: 7 })
      Cookies.set('token', token, { expires: 7 })
      Cookies.set('role', 'User', { expires: 7 })
      window.location.href = '/'
    } else {
      alertError('Lỗi hệ thống')
    }
  }, [location.search, navigate])

  return <></>
}
export default SignInGoogle
