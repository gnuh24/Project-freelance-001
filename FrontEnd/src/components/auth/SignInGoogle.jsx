import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { alertError, alertSuccess } from '../sweeetalert/sweetalert'

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
      localStorage.setItem('id', id)
      localStorage.setItem('email', email)
      localStorage.setItem('token', token)
      localStorage.setItem('role', 'User')

      alertSuccess('Đăng nhập thành công')
      navigate('/')
    } else {
      alertError('Lỗi hệ thống')
    }
  }, [location.search, navigate])

  return <></>
}
export default SignInGoogle
