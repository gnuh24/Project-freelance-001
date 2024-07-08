import axiosClient from '../AxiosClient'

const getBrandsAPI = async () => {
  const data = await axiosClient.get('/ShoeSize')
  return data
}

const getBrandAPI = async (id) => {
  const data = await axiosClient.get(`/ShoeSize/${id}`)
  return data
}

const postBrandAPI = async (payload) => {
  const data = await axiosClient.post('/ShoeSize', payload)
  return data
}

const putBrandAPI = async (payload) => {
  const data = await axiosClient.put(`/ShoeSize/${payload.id}`, payload)
  return data
}

const deleteBrandAPI = async (id) => {
  const data = await axiosClient.delete(`/ShoeSize/${id}`)
  return data
}

export { getBrandsAPI, getBrandAPI, postBrandAPI, putBrandAPI, deleteBrandAPI }
