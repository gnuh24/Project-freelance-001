import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteCartItem,
  getCartItem,
  postCartItem,
  putCartItem,
} from '../../apis/shopping/Cart'
const initialState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchCartItem = createAsyncThunk(
  'cart/fetchCartItem',
  async (id, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue(401)
    }

    try {
      const response = await getCartItem(id)
      console.log('response', response)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch cart item',
      )
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
      return response
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
      return response
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
      .addCase(fetchCartItem.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.data = Array.isArray(action.payload)
          ? action.payload
          : [action.payload]
      })
      .addCase(fetchCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter((item) => item.id !== action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export default cartSlice.reducer
