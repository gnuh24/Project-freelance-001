import AxiosAdmin from '../AxiosAdmin'

// Get users without pagination

const getAccountByAdmin = async (
  pageSize,
  pageNumber,
  sort,
  status,
  role,
  from,
  to,
) => {
  const params = {}
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (sort !== null && sort !== undefined) params.sort = sort
  if (status !== null && status !== undefined) params.status = status
  if (role !== null && role !== undefined) params.role = role
  if (from !== null && from !== undefined) params.from = from
  if (to !== null && to !== undefined) params.to = to

  try {
    const data = await AxiosAdmin.get('/Account', { params })
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Get users with pagination, sorting, and search
const getUsersAPI = async (pageSize, pageNumber, sort, search) => {
  const params = {}
  if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize
  if (pageNumber !== null && pageNumber !== undefined)
    params.pageNumber = pageNumber
  if (sort !== null && sort !== undefined) params.sort = sort
  if (search !== null && search !== undefined) params.search = search
  try {
    const data = await axiosClient.get('/User', { params })
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Get a single user by ID
const getAccountAndUserInformationById = async (id) => {
  try {
    const data = await AxiosAdmin.get(`/Account/${id}`)
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

// Create a new user
const postUserAPI = async (payload) => {
  console.log(payload)
  const data = await AxiosAdmin.post('/User', payload)
  return data
}

// Update an existing user
const putUserAPI = async (payload) => {
  const data = await axiosClient.put(`/User/${payload.id}`, payload)
  return data
}

// Delete a user by ID
const deleteUserAPI = async (id) => {
  const data = await axiosClient.delete(`/User/${id}`)
  return data
}

export {}
