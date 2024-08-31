import axios from 'axios'

export const LoginGoogle = async () => {
  try {
    // Gọi API mà không cần thiết lập cookie trong header
    const response = await axios.get('http://localhost:8080/Auth/Google', {
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('Error during Google login:', error)
    throw error // Ném lỗi ra ngoài để xử lý nếu cần
  }
}
