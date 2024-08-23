import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AxiosAdmin from "../../apis/AxiosAdmin"



const initialState = {
    data: [],
    status: 'idle',
    error: null
}




export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (query) => {
        const response = await AxiosAdmin.get(`http://localhost:8080/Shoe/Admin?${query}`)

        return response.data
    }
)

export const postProducts = createAsyncThunk(
    'products/postProducts',
    async (product) => {
        await AxiosAdmin.post('http://localhost:8080/Shoe', product)
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null

            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(postProducts.fulfilled, (state) => {
                state.status ='succeeded'
                state.data = [...state.data, action.payload]
            })
            .addCase(postProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})



export default productSlice.reducer