import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getFeedbacksAPI, 
    getFeedbackByIdAPI, 
    createFeedbackAPI, 
    deleteFeedbackAPI 
} from '../../apis/other/Feedback'; // Adjust import paths as necessary

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

// Fetch all feedbacks with additional filter parameters
export const getFeedbacksApiThunk = createAsyncThunk(
    'feedbacks/getAll',
    async ({ pageSize, pageNumber, sort, search, isChecked, from, to }, { rejectWithValue }) => {
        try {
            const params = {
                pageSize,
                pageNumber,
                sort,
                search,
                isChecked,
                from,
                to,
            };

            const response = await getFeedbacksAPI(params);
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Fetch feedback by ID
export const getFeedbackByIdApiThunk = createAsyncThunk(
    'feedbacks/getById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getFeedbackByIdAPI(id);
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Create a new feedback
export const createFeedbackApiThunk = createAsyncThunk(
    'feedbacks/create',
    async (newFeedback, { rejectWithValue }) => {
        try {
            const response = await createFeedbackAPI(newFeedback);
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Delete feedback by ID
export const deleteFeedbackApiThunk = createAsyncThunk(
    'feedbacks/delete',
    async (id, { rejectWithValue }) => {
        try {
            await deleteFeedbackAPI(id);
            return id;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacksApiThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getFeedbacksApiThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getFeedbacksApiThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getFeedbackByIdApiThunk.fulfilled, (state, action) => {
                // Handle individual feedback retrieval if needed
            })
            .addCase(createFeedbackApiThunk.fulfilled, (state, action) => {
                // Handle feedback creation if needed
            })
            .addCase(deleteFeedbackApiThunk.fulfilled, (state, action) => {
                if (state.data && Array.isArray(state.data)) {
                    state.data = state.data.filter(feedback => feedback.id !== action.payload);
                }
            })
            .addCase(deleteFeedbackApiThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default feedbackSlice.reducer;
