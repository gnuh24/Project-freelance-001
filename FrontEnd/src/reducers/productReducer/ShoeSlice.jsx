import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoesAPI,
  getShoeAPI,
  postShoeAPI,
  putShoeAPI,
  deleteShoeAPI,
  getShoesAdminAPI,
} from '../../apis/productAPI/Shoe'

const initialState = {
  data: {},
  status: 'idle',
  error: null,
}

export const getShoesApiThunk = createAsyncThunk(
  'shoes/getShoes', // Action type
  async (params, { rejectWithValue }) => {
    try {
      // console.log(params)
      const response = await getShoesAPI(
        params.pageSize,
        params.pageNumber,
        params.sort,
        params.minPrice,
        params.search,
        params.maxPrice,
        params.brandId,
        params.shoeTypeId,
        params.listShoeColorId,
      )
      return response.data // Ensure you return the data property
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const getShoesAdminApiThunk = createAsyncThunk(
  'shoes/getShoesAdmin', // Action type
  async (
    {
      pageNumber,
      pageSize,
      sort,
      status,
      brandId,
      shoeTypeId,
      priority,
      search,
      minCreateDate,
      maxCreateDate,
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await getShoesAdminAPI(
        pageNumber,
        pageSize,
        sort,
        status,
        brandId,
        shoeTypeId,
        priority,
        search,
        minCreateDate,
        maxCreateDate,
      )
      return response.data // Ensure you return the data property
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const getShoeApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async (id) => {
    const response = await getShoeAPI(id)
    return response.data
  },
)

export const postShoeApiThunk = createAsyncThunk(
  'shoes/postShoeApiThunk',
  async (shoe) => {
    const response = await postShoeAPI(shoe)
    return response.data
  },
)

export const putShoeApiThunk = createAsyncThunk(
  'shoes/putShoeApiThunk',
  async (shoe) => {
    const response = await putShoeAPI(shoe)
    return response.data
  },
)

export const deleteShoeApiThunk = createAsyncThunk(
  'shoes/deleteShoeApiThunk',
  async (id) => {
    const response = await deleteShoeAPI(id)
    return response.data
  },
)

const ShoeSlice = createSlice({
  name: 'shoeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoesApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoesAdminApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoesAdminApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoesAdminApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = [...state.data, action.payload]
      })
      .addCase(postShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(putShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(putShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(putShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((data) => data.id !== action.payload)
      })
      .addCase(deleteShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { actions, reducer } = ShoeSlice
export default reducer
