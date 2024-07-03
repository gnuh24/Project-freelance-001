import axiosClient from '../AxiosClient'

const getShoeTypesAPI = async () => {
  const data = await axiosClient.get('/ShoeSize')
  return data
}

const getShoeTypeAPI = async (id) => {
  const data = await axiosClient.get(`/ShoeSize/${id}`)
  return data
}

const postShoeTypeAPI = async (payload) => {
  const data = await axiosClient.post('/ShoeSize', payload)
  return data
}

const putShoeTypeAPI = async (payload) => {
  const data = await axiosClient.put(`/ShoeSize/${payload.id}`, payload)
  return data
}

const deleteShoeTypeAPI = async (id) => {
  const data = await axiosClient.delete(`/ShoeSize/${id}`)
  return data
}

export {
  getShoeTypesAPI,
  getShoeTypeAPI,
  postShoeTypeAPI,
  putShoeTypeAPI,
  deleteShoeTypeAPI,
}
