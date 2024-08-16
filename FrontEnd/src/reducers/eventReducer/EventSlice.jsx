import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosAdmin from "../../apis/AxiosAdmin";


export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (query, { rejectWithValue}) => {
        try {
            const response = await AxiosAdmin.get(`http://localhost:8080/Event/Admin?${query}`);

            console.log(response.data)
            return response.data;


        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
)



const initialState = {
    data: [],
    status: 'idle',
    error: null
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(fetchEvents.pending, (state)=> {
            state.status = 'loading';
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload; 
        })
        
        .addCase(fetchEvents.rejected, (state,action)=> {
            state.status = 'failed';
            state.error = action.error.message;
        })
        
    }
})



export default eventSlice.reducer;