import AxiosAdmin from '../AxiosAdmin';
import axios from 'axios';  // Make sure axios is imported

// Get users without pagination

// const getAccountByAdmin = async (
//     pageSize,
//     pageNumber,
//     sort,
//     status,
//     role,
//     from,
//     to,
// ) => {
//     const params = {};
//     if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
//     if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
//     if (sort !== null && sort !== undefined) params.sort = sort;
//     if (status !== null && status !== undefined) params.status = status;
//     if (role !== null && role !== undefined) params.role = role;
//     if (from !== null && from !== undefined) params.from = from;
//     if (to !== null && to !== undefined) params.to = to;

//     try {
//         const data = await AxiosAdmin.get('/Account', { params });
//         return data;
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         throw error;
//     }
// };

// Get users with pagination, sorting, and search
const getAccountsAPI = async (pageSize, pageNumber, sort, search) => {
    const params = {};
    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
    if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
    if (sort !== null && sort !== undefined) params.sort = sort;
    if (search !== null && search !== undefined) params.search = search;

    try {
        const data = await AxiosAdmin.get('/Account', { params });
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Get a single user by ID
const getAccountAndUserInformationById = async (id) => {
    try {
        const data = await AxiosAdmin.get(`/Account/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Update an existing user
const putAccountAPI = async (account) => {
  try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('accountId', account.accountId);
      formData.append('status', account.status);

      // Make the PUT request with form-data
      const response = await AxiosAdmin.patch('/Account/ChangeStatus', formData);

      return response;  // Ensure response data is returned
  } catch (error) {
      console.error('Error updating account status:', error);
      throw new Error('Error updating account status');
  }
};

export {
    getAccountsAPI,
    getAccountAndUserInformationById,
    putAccountAPI,
};
