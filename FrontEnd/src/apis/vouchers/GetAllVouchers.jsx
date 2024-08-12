import axiosAdmin from '../AxiosAdmin.jsx'
import axiosClient from '../AxiosClient.jsx'

const GetAllVochers = async (
  pageSize,
  sort,
  search,
  maxPrice,
  status,
  minSize,
  maxSize,
) => {
  const params = {}

  if (pageSize !== null || pageSize !== undefined) params.pageSize = pageSize
  if (sort !== null || sort !== undefined) params.sort = sort
  if (search !== null || search !== undefined) params.search = search
  if (maxPrice !== null || maxPrice !== undefined) params.maxPrice = maxPrice
  if (status !== null || status !== undefined) params.status = status
  if (minSize !== null || minSize !== undefined) params.minSize = minSize
  if (maxSize !== null || maxSize !== undefined) params.maxSize = maxSize
  const data = await axiosClient.get('/Voucher/Admin', { params })
  return data
}




export default GetAllVochers