import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosAdmin from "../../apis/AxiosAdmin";

export const fetchVouchers = createAsyncThunk(
    'voucher/fetchVouchers',
    async (query, { rejectWithValue }) => {
        try {
            let response;
            if (query === '') {
                response = await AxiosAdmin.get(`http://localhost:8080/Voucher/Admin`);
            } else {
                if (query.includes('searchValue')) {
                    const params = new URLSearchParams(query);
                    const value = params.get('searchValue');
                    response = await AxiosAdmin.get(`http://localhost:8080/Voucher?code=${value}`);
                    if (!response.data) {
                        throw new Error('No Voucher found');
                    }
                } else {
                    response = await AxiosAdmin.get(`http://localhost:8080/Voucher/Admin?${query}`);
                }
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            return rejectWithValue(error.message);
        }
    }
);


export const addVoucher = createAsyncThunk(
    'voucher/addVoucher',
    async (newVoucher) => {
        const response = await AxiosAdmin.post(`http://localhost:8080/Voucher`, newVoucher);
        console.log(newVoucher);
        return response.data;
    }
);

export const deleteVoucher = createAsyncThunk(
    'voucher/deleteVoucher',
    async (id) => {
        await AxiosAdmin.delete(`http://localhost:8080/Voucher/${id}`);
        return id; 
    }
);


export const editVoucher = createAsyncThunk(
    'voucher/editVoucher',
    async (updatedVoucher) => {
        const response = await AxiosAdmin.patch(`http://localhost:8080/Voucher`, updatedVoucher);
        
        return response.data;
    }
);

const initialState = {
    data: [],
    status: 'idle',
    error: null,
};

const voucherSlice = createSlice({
    name: 'vouchers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVouchers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchVouchers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addVoucher.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(deleteVoucher.fulfilled, (state, action) => {
                
                state.data = state.data.filter(voucher => voucher.id !== action.payload);
            })
            .addCase(editVoucher.fulfilled, (state, action) => {
                
                const index = state.data.findIndex(voucher => voucher.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            });
    },
});

export default voucherSlice.reducer;
