import axiosClient from '../AxiosClient.jsx'

const getShoesAPI = async (
  pageSize,
  sort,
  search,
  maxPrice,
  status,
  minSize,
  maxSize,
) => {
  const params = {}

  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (sort !== null && sort !== undefined) params.sort = sort
  if (search !== null && search !== undefined) params.search = search
  if (maxPrice !== null && maxPrice !== undefined) params.maxPrice = maxPrice
  if (status !== null && status !== undefined) params.status = status
  if (minSize !== null && minSize !== undefined) params.minSize = minSize
  if (maxSize !== null && maxSize !== undefined) params.maxSize = maxSize
  console.log(params)
  const data = await axiosClient.get('/Shoe/CommonUser', { params })
  return data
}

const getShoeAPI = async (id) => {
  const data = await axiosClient.get(`/Shoe/CommonUser/${id}`)
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
