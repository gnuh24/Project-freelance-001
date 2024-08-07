import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccountsAPI, putAccountAPI } from '../../apis/user/Account.jsx';

const initialState = {
    data: [],
    status: 'idle', // Idle, loading, succeeded, failed
    error: null,
};

export const getAccountsApiThunk = createAsyncThunk(
    'getAccountsAPI/getAccountsApiThunk',
    async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
        try {
            const response = await getAccountsAPI(pageSize, pageNumber, sort, search);
            return response.data;
        } catch (error) {
            // Check if the error response exists and has data, otherwise return the error message
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const putAccountApiThunk = createAsyncThunk(
    'putAccountAPI/putAccountApiThunk',
    async (account) => {
        const response = await putAccountAPI(account);
        return response.data;
    }
);

const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAccountsApiThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAccountsApiThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getAccountsApiThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(putAccountApiThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(putAccountApiThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update the specific account in the state
                state.data = state.data.map((account) =>
                    account.id === action.payload.id ? action.payload : account
                );
            })
            .addCase(putAccountApiThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default accountSlice.reducer;
