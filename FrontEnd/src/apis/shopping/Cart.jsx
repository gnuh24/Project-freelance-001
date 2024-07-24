import axiosAdmin from '../AxiosAdmin'
export const getCartItem = async () => {
  try {
    const response = await axiosAdmin.post('/CartItem')
    return response.data
  } catch (error) {
    console.log('Failed to get cart item: ', error)
    throw error
  }
}

export const postCartItem = async (payload) => {
  try {
    const response = await axiosAdmin.post('/CartItem', payload)
    return response
  } catch (error) {
    console.log('Failed to add cart item: ', error)
    throw error
  }
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
