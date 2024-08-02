import axiosAdmin from '../AxiosAdmin.jsx'
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
  const data = await axiosClient.get('/Shoe/CommonUser', { params })
  return data
}

const getShoeAPI = async (id) => {
  const data = await axiosClient.get(`/Shoe/CommonUser/${id}`)
  return data
}

const getShoesAdminAPI = async (
  pageNumber,
  pageSize,
  sort,
  status,
  brandId,
  shoeTypeId,
  priority,
  search,
  minCreateDate,
  maxCreateDate,
) => {
  const params = {}

  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (sort !== null && sort !== undefined) params.sort = sort
  if (status !== null && status !== undefined) params.status = status
  if (brandId !== null && brandId !== undefined) params.brandId = brandId
  if (shoeTypeId !== null && shoeTypeId !== undefined)
    params.shoeTypeId = shoeTypeId
  if (priority !== null && priority !== undefined) params.priority = priority
  if (search !== null && search !== undefined) params.search = search
  if (minCreateDate !== null && minCreateDate !== undefined)
    params.minCreateDate = minCreateDate
  if (maxCreateDate !== null && maxCreateDate !== undefined)
    params.maxCreateDate = maxCreateDate

  const data = await axiosAdmin.get('/Shoe/Admin', { params })
  return data
}

const postShoeAPI = async (shoe) => {
  const data = await axiosAdmin.post('/Shoe', shoe)
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

export {
  getShoesAPI,
  getShoeAPI,
  postShoeAPI,
  putShoeAPI,
  deleteShoeAPI,
  getShoesAdminAPI,
}
