import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ShoeSizeApi from '../../apis/productAPI/ShoeSize'
const initialState = {
  data: [],
  loading: false,
  error: null,
}

export const getShoeSizesApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async () => {
    const response = await ShoeSizeApi.getShoeSizesAPI()
    return response.data
  },
)

export const getShoeSizeApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async (id) => {
    const response = await ShoeSizeApi.getShoeSizeAPI(id)
    return response.data
  },
)
export const postShoeSizeApiThunk = createAsyncThunk(
  'shoes/postShoeApiThunk',
  async (shoe) => {
    const response = await ShoeSizeApi.postShoeSizeAPI(shoe)
    return response.data
  },
)

export const putShoeSizeApiThunk = createAsyncThunk(
  'shoes/putShoeApiThunk',
  async (shoe) => {
    const response = await ShoeSizeApi.putShoeSizeAPI(shoe)
    return response.data
  },
)

export const deleteShoeSizeApiThunk = createAsyncThunk(
  'shoes/deleteShoeApiThunk',
  async (id) => {
    const response = await ShoeSizeApi.deleteShoeSizeAPI(id)
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
