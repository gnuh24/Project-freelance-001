import axiosClient from '../AxiosClient.jsx'

const getShoesAPI = async () => {
  const data = await axiosClient.get('/Shoe/CommonUser')
  return data
}

const getShoeAPI = async (id) => {
  const data = await axiosClient.get(`/shoes/${id}`)
  return data
}

const postShoeAPI = async (shoe) => {
  const data = await axiosClient.post('/shoes', shoe)
  return data
}

const putShoeAPI = async (shoe) => {
  const data = await axiosClient.put(`/shoes/${shoe.id}`, shoe)
  return data
}

const deleteShoeAPI = async (id) => {
  const data = await axiosClient.delete(`/shoes/${id}`)
  return data
}

export { getShoesAPI, getShoeAPI, postShoeAPI, putShoeAPI, deleteShoeAPI }
