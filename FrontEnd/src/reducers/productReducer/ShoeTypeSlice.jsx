import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoeTypesNoPageAPI,
  getShoeTypesAPI,
  getShoeTypeAPI,
  postShoeTypeAPI,
  putShoeTypeAPI,
  deleteShoeTypeAPI,
} from '../../apis/productAPI/ShoeType' // Adjust the import according to your file structure

const initialState = {
  data: [],
  loading: false,
  error: null,
}

// Async thunks
export const getShoeTypesNoPageApiThunk = createAsyncThunk(
  'brands/getShoeTypesNoPageApiThunk',
  async () => {
    const response = await getShoeTypesNoPageAPI()
    return response.data
  },
)

export const getShoeTypesApiThunk = createAsyncThunk(
  'shoeTypes/getShoeTypesApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getShoeTypesAPI(pageSize, pageNumber, sort, search)
      return response.data // Return the data from the API response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  },
)

export const getShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/getShoeTypeApiThunk',
  async (id) => {
    const response = await getShoeTypeAPI(id)
    return response.data
  },
)

export const postShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/postShoeTypeApiThunk',
  async (shoeType, { rejectWithValue }) => {
    try {
      const response = await postShoeTypeAPI(shoeType)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  },
)

export const putShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/putShoeTypeApiThunk',
  async (shoeType) => {
    const response = await putShoeTypeAPI(shoeType)
    return response.data
  },
)

export const deleteShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/deleteShoeTypeApiThunk',
  async (id) => {
    const response = await deleteShoeTypeAPI(id)
    return response.data
  },
)

// Slice
const shoeTypeSlice = createSlice({
  name: 'shoeTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoeTypesNoPageApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getShoeTypesNoPageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getShoeTypesNoPageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getShoeTypesApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getShoeTypesApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.content
      })
      .addCase(getShoeTypesApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getShoeTypeApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getShoeTypeApiThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(getShoeTypeApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(postShoeTypeApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(postShoeTypeApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, action.payload]
      })
      .addCase(postShoeTypeApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(putShoeTypeApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(putShoeTypeApiThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(putShoeTypeApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteShoeTypeApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteShoeTypeApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter((data) => data.id !== action.meta.arg)
      })
      .addCase(deleteShoeTypeApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { actions, reducer } = shoeTypeSlice
export default reducer
