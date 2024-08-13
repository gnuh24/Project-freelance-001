import AxiosAdmin from '../AxiosAdmin'; // Adjust import paths as necessary

// Fetch all shipping fees with optional filter parameters
const getShippingFeesAPI = async ({ pageSize, pageNumber, sort }) => {
    const params = {};

    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
    if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
    if (sort !== null && sort !== undefined) params.sort = sort;

    try {
        const response = await AxiosAdmin.get('/ShippingFee', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching shipping fees:', error);
        throw error;
    }
};

// Fetch the newest shipping fees
const getNewestShippingFeesAPI = async () => {
    try {
        const response = await AxiosAdmin.get('/ShippingFee/Newest');
        return response.data;
    } catch (error) {
        console.error('Error fetching newest shipping fees:', error);
        throw error;
    }
};

// Create a new shipping fee
const createShippingFeeAPI = async (newShippingFee) => {
    try {
        const response = await AxiosAdmin.post('/ShippingFee', newShippingFee);
        return response.data;
    } catch (error) {
        console.error('Error creating shipping fee:', error);
        throw error;
    }
};

export {
    getShippingFeesAPI,
    getNewestShippingFeesAPI,
    createShippingFeeAPI,
};
