import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AxiosAdmin from "../../apis/AxiosAdmin"





const initialState = {
    data: [],
    status: 'idle',
    error: null
}



export const getNews = createAsyncThunk(
    'news/fetch',
    async (query) => {
        try {
            const response = await AxiosAdmin.get(`http://localhost:8080/News/Admin?${query}`)
            return response.data
        } catch (error) {
            throw error
        }
    }
)


const newSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = action.payload
            })
            .addCase(getNews.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export default newSlice.reducer