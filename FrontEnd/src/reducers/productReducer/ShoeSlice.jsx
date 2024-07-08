import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ShoeApi from '../../apis/productAPI/Shoe'
const initialState = {
  data: [],
  loading: false,
  error: null,
}

export const getShoesApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async () => {
    const response = await ShoeApi.getShoesAPI()
    return response.data
  },
)

export const getShoeApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async (id) => {
    const response = await ShoeApi.getShoeAPI(id)
    return response.data
  },
)
export const postShoeApiThunk = createAsyncThunk(
  'shoes/postShoeApiThunk',
  async (shoe) => {
    const response = await ShoeApi.postShoeAPI(shoe)
    return response.data
  },
)

export const putShoeApiThunk = createAsyncThunk(
  'shoes/putShoeApiThunk',
  async (shoe) => {
    const response = await ShoeApi.putShoeAPI(shoe)
    return response.data
  },
)

export const deleteShoeApiThunk = createAsyncThunk(
  'shoes/deleteShoeApiThunk',
  async (id) => {
    const response = await ShoeApi.deleteShoeAPI(id)
    return response.data
  },
)

const ShoeSlice = createSlice({
  name: 'shoeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShoesApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getShoesApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getShoesApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(postShoeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(postShoeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data.push(action.payload)
    })
    builder.addCase(postShoeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(getShoeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getShoeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(getShoeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(putShoeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(putShoeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      const index = state.data.findIndex(
        (data) => data.id === action.payload.id,
      )
      if (index !== -1) {
        state.data[index] = action.payload
      }
    })
    builder.addCase(putShoeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(deleteShoeApiThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteShoeApiThunk.fulfilled, (state, action) => {
      state.loading = false
      state.data.filter((data) => data.id !== action.payload)
    })
    builder.addCase(deleteShoeApiThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const { actions, reducer } = ShoeSlice
export default reducer
