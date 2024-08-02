import axiosAdmin from '../AxiosAdmin'
export const getCartItem = async (id) => {
  const response = await axiosAdmin.get(`/CartItem/${id}`)
  return response
}

export const postCartItem = async (payload) => {
  const response = await axiosAdmin.post('/CartItem', payload)
  return response
}

export const putCartItem = async (id, payload) => {
  try {
    const response = await axiosAdmin.put(`/CartItem/${id}`, payload)
    return response.data
  } catch (error) {
    console.log('Failed to update cart item: ', error)
    throw error
  }
}

export const deleteCartItem = async (id) => {
  try {
    const response = await axiosAdmin.delete(`/CartItem/${id}`)
    return response.data
  } catch (error) {
    console.log('Failed to delete cart item: ', error)
    throw error
  }
}
