import axiosClient from '../AxiosClient'

const getColorsNoPageAPI = async () => {
  const data = await axiosClient.get('/ShoeColor/noPaging')
  return data
}

const getColorsAPI = async () => {
  const data = await axiosClient.get('/shoeColor')
  return data
}

const getColorAPI = async (id) => {
  const data = await axiosClient.get(`/shoeColor/${id}`)
  return data
}

const postColorAPI = async (payload) => {
  const data = await axiosClient.post('/shoeColor', payload)
  return data
}

const putColorAPI = async (payload) => {
  const data = await axiosClient.put(`/shoeColor/${payload.id}`, payload)
  return data
}

const deleteColorAPI = async (id) => {
  const data = await axiosClient.delete(`/Color/${id}`)
  return data
}

export {
  getColorsNoPageAPI,
  getColorsAPI,
  getColorAPI,
  postColorAPI,
  putColorAPI,
  deleteColorAPI,
}
