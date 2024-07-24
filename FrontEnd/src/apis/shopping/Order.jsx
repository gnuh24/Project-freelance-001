import AxiosAdmin from '../AxiosAdmin'

export const getListOrderByAdmin = async () => {
  try {
    const response = await AxiosAdmin.get('/Order')
    return response
  } catch (error) {
    console.log('Failed to get list order by admin: ', error)
    throw error
  }
}

export const getListOrderByUser = async () => {
  try {
    const response = await AxiosAdmin.get('/Order')
    return response
  } catch (error) {
    console.log('Failed to get list order by admin: ', error)
    throw error
  }
}

export const getDetailOrderByAdmin = async (id) => {
  try {
    const response = await AxiosAdmin.get(`/Order/${id}`)
    return response
  } catch (error) {
    console.log('Failed to get detail order by admin: ', error)
    throw error
  }
}

export const getDetailOrderByUser = async (id) => {
  try {
    const response = await AxiosAdmin.get(`/Order/${id}`)
    return response
  } catch (error) {
    console.log('Failed to get detail order by user: ', error)
    throw error
  }
}

export const postOrderByAdmin = async (payload) => {
  try {
    const response = await AxiosAdmin.post('/Order', payload)
    return response
  } catch (error) {
    console.log('Failed to add order by admin: ', error)
    throw error
  }
}

export const postOrderByUser = async (payload) => {
  try {
    const response = await AxiosAdmin.post('/Order', payload)
    return response
  } catch (error) {
    console.log('Failed to add order by user: ', error)
    throw error
  }
}

export const putOrder = async (id, payload) => {
  try {
    const response = await AxiosAdmin.put(`/Order/${id}`, payload)
    return response
  } catch (error) {
    console.log('Failed to update order by admin: ', error)
    throw error
  }
}
