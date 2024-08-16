import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosAdmin from "../../apis/AxiosAdmin";


export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (query, { rejectWithValue }) => {
        try {
            const response = await AxiosAdmin.get(`http://localhost:8080/Event/Admin?${query}`);
            const data = response.data.content;

           
            const updatedData = await Promise.all(data.map(async (event) => {
                try {
                    const bannerResponse = await AxiosAdmin.get(`http://localhost:8080/Event/Banner/${event.bannerUrl}`);
                    event.banner = bannerResponse.data;
                } catch (bannerError) {
                    console.error(`Failed to fetch banner for event ID ${event.id}:`, bannerError);
                    event.banner = null;
                }
                return event;
            }));


           

            return {
                ...response.data,
                content: updatedData,
            };
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
)



export const addEvents = createAsyncThunk(
    'events/addEvents',
    async (newEvent)=> {
        const response = await AxiosAdmin.post('http://localhost:8080/Event', newEvent)
        return response.data;
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload; 
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEvents.pending, (state)=> {
                state.status = 'loading';
            })
            .addCase(addEvents.fulfilled, (state, action)=> {
                state.status ='succeeded';
                state.data.push(action.payload);
            })
            .addCase(addEvents.rejected, (state, action)=> {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default eventSlice.reducer;
