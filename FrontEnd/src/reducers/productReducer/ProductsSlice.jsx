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


export const getInventoryProducts = createAsyncThunk(
    'products/getInventoryProducts',
    async (query) => {
        const response = await AxiosAdmin.get(`http://localhost:8080/Shoe/Inventory?${query}`)
        return response.data
    }
)

export const postProducts = createAsyncThunk(
    'products/postProducts',
    async (product) => {
        const response =  await AxiosAdmin.post('http://localhost:8080/Shoe', product)

        return response.data
    }
)

export const patchProducts = createAsyncThunk(
    'products/patchProducts',
    async (product) => {
        const response = await AxiosAdmin.patch(`http://localhost:8080/Shoe`, product)
        return response.data
    }
)

export const patchProductSize = createAsyncThunk(
    'products/patchProductSize',
    async (shoeSize) => {


        const response =  await AxiosAdmin.patch(`http://localhost:8080/ShoeSize`, shoeSize )
        return response.data
    }
)

export const createShoeSizes = createAsyncThunk(
    'products/createShoeSizes',
    async (productId, shoeSizes) => {
        const response = await AxiosAdmin.post(`http://localhost:8080/ShoeSize`, shoeSizes)
        return response.data

    }
)

export const patchImage = createAsyncThunk(
    'products/patchImage',
    async ({ imageId, image }) => {
        console.log(imageId, image);
        const response = await AxiosAdmin.patch(`http://localhost:8080/ShoeImage/${imageId}`, image);
        return response.data;
    }
);


export const getShoeSize = createAsyncThunk(
    'products/getShoeSize',
    async (shoeId) => {
        const response = await AxiosAdmin.get(`http://localhost:8080/ShoeSize/${shoeId}`)
        return response.data
    }
)




export const postImage = createAsyncThunk(
    'products/postImage',
    async ({ productId, image }) => {
        const response = await AxiosAdmin.post(`http://localhost:8080/ShoeImage/${productId}`, image);
        return response.data;
    }
)


export const deleteColor = createAsyncThunk(
    'products/deleteColor',
    async (color) => {
        const response = await AxiosAdmin.delete(`http://localhost:8080/ShoeColor`, color)
        return response.data
    }
)


export const postColor = createAsyncThunk(
    'products/postColor',
    async (color) => {
        const response = await AxiosAdmin.post(`http://localhost:8080/ShoeColor`, color)
        return response.data
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
            .addCase(patchProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(patchProducts.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = state.data.map(product => product.id === action.payload.id? action.payload : product)
            })
            .addCase(patchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(patchProductSize.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(patchProductSize.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = state.data.map(product => product.id === action.payload.productId? {...product, shoeSizes: [...product.shoeSizes, action.payload] } : product)
            })
            .addCase(patchProductSize.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(patchImage.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(patchImage.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = Array(state.data).map(product => product.id === action.payload.productId? {...product, images: [...product.images, action.payload] } : product)
            })
            .addCase(patchImage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postImage.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(postImage.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = Array(state.data).map(product => product.id === action.payload.shoeId? {...product, shoeImages: [action.payload] } : product)
            })
            .addCase(postImage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteColor.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.status ='succeeded'
               
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postColor.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(postColor.fulfilled, (state, action) => {
                state.status ='succeeded'
               
            })
            .addCase(postColor.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(getShoeSize.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getShoeSize.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = action.payload
            })
            .addCase(getShoeSize.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createShoeSizes.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(createShoeSizes.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = state.data.map(product => product.id === action.payload.productId? {...product, shoeSizes: [...product.shoeSizes,...action.payload.shoeSizes] } : product)
            })
            .addCase(createShoeSizes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(getInventoryProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null

            })
            .addCase(getInventoryProducts.fulfilled, (state, action) => {
                state.status ='succeeded'
                state.data = action.payload
            })
            .addCase(getInventoryProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            

    }

})



export default productSlice.reducer