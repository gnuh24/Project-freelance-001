import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getDetailOrderByAdmin,
  getDetailOrderByUser,
  getListOrderByAdmin,
  getListOrderByUser,
  postOrderByAdmin,
  postOrderByUser,
  putOrder,
} from '../../apis/shopping/Order'

export const fetchListOrderByAdmin = createAsyncThunk(
  'order/fetchListOrderByAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListOrderByAdmin()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch list order by admin',
      )
    }
  },
)

export const fetchListOrderByUser = createAsyncThunk(
  'order/fetchListOrderByUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListOrderByUser()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch list order by user',
      )
    }
  },
)

export const fetchDetailOrderByAdmin = createAsyncThunk(
  'order/fetchDetailOrderByAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDetailOrderByAdmin(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch detail order by admin',
      )
    }
  },
)

export const fetchDetailOrderByUser = createAsyncThunk(
  'order/fetchDetailOrderByUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDetailOrderByUser(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch detail order by user',
      )
    }
  },
)

export const createOrderByAdmin = createAsyncThunk(
  'order/createOrderByAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postOrderByAdmin(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to add order by admin',
      )
    }
  },
)

export const createOrderByUser = createAsyncThunk(
  'order/createOrderByUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postOrderByUser(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to add order by user',
      )
    }
  },
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await putOrder(id, payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to update order by admin',
      )
    }
  },
)

const initialState = {
  orders: [],
  orderDetail: null,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOrderByAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchListOrderByAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchListOrderByAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchListOrderByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchListOrderByUser.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchListOrderByUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchDetailOrderByAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDetailOrderByAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.orderDetail = action.payload
      })
      .addCase(fetchDetailOrderByAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchDetailOrderByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDetailOrderByUser.fulfilled, (state, action) => {
        state.loading = false
        state.orderDetail = action.payload
      })
      .addCase(fetchDetailOrderByUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createOrderByAdmin.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrderByAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(createOrderByAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createOrderByUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createOrderByUser.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(createOrderByUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        )
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer
