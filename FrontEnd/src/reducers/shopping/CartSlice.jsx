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
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const formData = new FormData()
      formData.append('accountId', payload.idAccountId)
      formData.append('shoeId', payload.idShoeId)
      formData.append('idSize', payload.idSize)
      formData.append('unitPrice', payload.unitPrice)
      formData.append('quantity', payload.quantity)
      formData.append('total', payload.total)
      const response = await putCartItem(formData)
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
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('accountId', payload.accountId)
      formData.append('shoeId', payload.idShoeId)
      formData.append('idSize', payload.idSize)
      await deleteCartItem(formData)
      return payload
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
  reducers: {
    updateQuantity: (state, action) => {
      if (action.payload.totalQuantity < action.payload.quantity) {
        return
      }

      const item = state.data.find(
        (item) =>
          item.idAccountId === action.payload.idAccountId &&
          item.idShoeId === action.payload.idShoeId &&
          item.idSize === action.payload.idSize,
      )

      if (item) {
        item.quantity = Math.max(action.payload.quantity, 1)
        const shoeSize = item.shoeDetails.shoeSizes.find(
          (properties) => properties.size === item.idSize, // Assuming you meant idSize
        )
        if (shoeSize) {
          item.total = item.quantity * shoeSize.price
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataCartThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getDataCartThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
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
        const index = state.data.findIndex(
          (properties) =>
            properties.idAccountId === action.payload.accountId &&
            properties.idShoeId === action.payload.idShoeId &&
            properties.idSize === action.payload.idSize,
        )
        console.log(action.payload)
        console.log(index)
        if (index !== -1) {
          state.data.splice(index, 1)
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { updateQuantity } = cartSlice.actions
export default cartSlice.reducer
