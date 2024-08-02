import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteCartItem,
  getCartItem,
  postCartItem,
  putCartItem,
} from '../../apis/shopping/Cart'
import { getShoeAPI } from '../../apis/productAPI/Shoe.jsx' // Import the async function directly

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const getDataCartThunk = createAsyncThunk(
  'cart/getDataCartThunk',
  async (accountId, { rejectWithValue }) => {
    try {
      // Fetch cart items
      const cartResponse = await getCartItem(accountId)
      const cartItems = Array.isArray(cartResponse.data)
        ? cartResponse.data
        : [cartResponse.data]

      // Fetch shoe details for each cart item
      const shoeDetailsPromises = cartItems.map(
        (item) => getShoeAPI(item.idShoeId), // Call the async function directly
      )
      const shoeDetails = await Promise.all(shoeDetailsPromises)

      // Combine cart items with shoe details
      return cartItems.map((item, index) => ({
        ...item,
        shoeDetails: shoeDetails[index].data, // Extract shoe details directly
      }))
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart data')
    }
  },
)

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postCartItem(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add cart item')
    }
  },
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await putCartItem(id, payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to update cart item',
      )
    }
  },
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to delete cart item',
      )
    }
  },
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataCartThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getDataCartThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(action.payload)
        state.data = action.payload
      })
      .addCase(getDataCartThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload)
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((item) => item.id !== action.payload.id)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default cartSlice.reducer
