import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getImagesAPI,
  getImageAPI,
  postImageAPI,
  putImageAPI,
  deleteImageAPI,
} from '../../apis/productAPI/Image' // Adjust the import according to your file structure

const initialState = {
  data: [],
  loading: false,
  error: null,
}

// Async thunks
export const getImagesApiThunk = createAsyncThunk(
  'images/getImagesApiThunk',
  async () => {
    const response = await getImagesAPI()
    return response.data
  },
)

export const getImageApiThunk = createAsyncThunk(
  'images/getImageApiThunk',
  async (id) => {
    const response = await getImageAPI(id)
    return response.data
  },
)

export const postImageApiThunk = createAsyncThunk(
  'images/postImageApiThunk',
  async (image) => {
    const response = await postImageAPI(image)
    return response.data
  },
)

export const putImageApiThunk = createAsyncThunk(
  'images/putImageApiThunk',
  async (image) => {
    const response = await putImageAPI(image)
    return response.data
  },
)

export const deleteImageApiThunk = createAsyncThunk(
  'images/deleteImageApiThunk',
  async (id) => {
    const response = await deleteImageAPI(id)
    return response.data
  },
)

// Slice
const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImagesApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getImagesApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getImagesApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getImageApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getImageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(getImageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(postImageApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(postImageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(postImageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(putImageApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(putImageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(putImageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteImageApiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteImageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter((data) => data.id !== action.meta.arg)
      })
      .addCase(deleteImageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { actions, reducer } = imageSlice
export default reducer
