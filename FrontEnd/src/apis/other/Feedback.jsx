import AxiosAdmin from '../AxiosAdmin'; // Adjust import paths as necessary
import axiosClient from '../AxiosClient';

// Fetch all feedbacks with additional filter parameters
const getFeedbacksAPI = async ({ pageSize, pageNumber, sort, search, isChecked, from, to }) => {
    const params = {};
    if (pageSize !== null && pageSize !== undefined) params.pageSize = pageSize;
    if (pageNumber !== null && pageNumber !== undefined) params.pageNumber = pageNumber;
    if (sort !== null && sort !== undefined) params.sort = sort;
    if (search !== null && search !== undefined) params.search = search;
    if (isChecked !== null && isChecked !== undefined) params.isChecked = isChecked;
    if (from) params.from = from; // Include the parameter only if it is defined and not null
    if (to) params.to = to; // Include the parameter only if it is defined and not null

    try {
        const response = await AxiosAdmin.get('/Feedback', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        throw error;
    }
};

// Fetch feedback by ID
const getFeedbackByIdAPI = async (id) => {
    try {
        const response = await AxiosAdmin.get(`http://localhost:8080/Feedback/1${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback by ID:', error);
        throw error;
    }
};

// Create a new feedback
const createFeedbackAPI = async (newFeedback) => {
    try {
        const response = await axiosClient.post('/Feedback', newFeedback);
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
};

// Delete feedback by ID
const deleteFeedbackAPI = async (id) => {
    try {
        await AxiosAdmin.delete(`/Feedback/${id}`);
        return id;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error;
    }
};

export {
    getFeedbacksAPI,
    getFeedbackByIdAPI,
    createFeedbackAPI,
    deleteFeedbackAPI,
};
