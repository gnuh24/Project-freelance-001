import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoeSizeAPI,
  getShoeSizesAPI,
  postShoeSizeAPI,
  putShoeSizeAPI,
  deleteShoeSizeAPI,
} from '../../apis/productAPI/ShoeSize'
const initialState = {
  data: [],
  loading: false,
  error: null,
}

export const getShoeSizesApiThunk = createAsyncThunk(
  'shoeSizes/getShoeSizesApiThunk',
  async () => {
    const response = await getShoeSizesAPI()
    return response.data
  },
)

export const getShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/getShoeSizeApiThunk',
  async (id) => {
    const response = await getShoeSizeAPI(id)
    return response.data
  },
)

export const postShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/postShoeSizeApiThunk',
  async (shoeSize) => {
    const response = await postShoeSizeAPI(shoeSize)
    return response.data
  },
)

export const putShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/putShoeSizeApiThunk',
  async (shoeSize) => {
    const response = await putShoeSizeAPI(shoeSize)
    return response.data
  },
)

export const deleteShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/deleteShoeSizeApiThunk',
  async (id) => {
    const response = await deleteShoeSizeAPI(id)
    return response.data
  },
)

const ShoeSizeSlice = createSlice({
  name: 'shoeSizeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShoeSizesApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getShoeSizesApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getShoeSizesApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(postShoeSizeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(postShoeSizeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data.push(action.payload)
    })
    builder.addCase(postShoeSizeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(getShoeSizeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getShoeSizeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getShoeSizeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(putShoeSizeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(putShoeSizeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id,
      )
      if (index !== -1) {
        state.data[index] = action.payload
      }
    })
    builder.addCase(putShoeSizeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(deleteShoeSizeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteShoeSizeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data.filter((data) => data.id !== action.payload)
    })
    builder.addCase(deleteShoeSizeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})
export const { actions, reducer } = ShoeSizeSlice
export default reducer
