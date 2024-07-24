import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBrandsNoPageAPI,
  getBrandsAPI,
  getBrandAPI,
  postBrandAPI,
  putBrandAPI,
  deleteBrandAPI,
} from '../../apis/productAPI/Brand.jsx'
const initialState = {
  data: [],
  loading: false,
  error: null,
}

// Async thunks
export const getBrandsNoPageApiThunk = createAsyncThunk(
  'brands/getBrandsNoPageApiThunk',
  async () => {
    const response = await getBrandsNoPageAPI()
    return response.data
  },
)

export const getBrandsApiThunk = createAsyncThunk(
  'brands/getBrandsApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getBrandsAPI(pageSize, pageNumber, sort, search)
      return response.data
    } catch (error) {
      // Check if the error response exists and has data, otherwise return the error message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const getBrandApiThunk = createAsyncThunk(
  'brands/getBrandApiThunk',
  async (id) => {
    const response = await getBrandAPI(id)
    return response.data
  },
)

export const postBrandApiThunk = createAsyncThunk(
  'brands/postBrandApiThunk',
  async (brand) => {
    const response = await postBrandAPI(brand)
    return response.data
  },
)

export const putBrandApiThunk = createAsyncThunk(
  'brands/putBrandApiThunk',
  async (brand) => {
    const response = await putBrandAPI(brand)
    return response.data
  },
)

export const deleteBrandApiThunk = createAsyncThunk(
  'brands/deleteBrandApiThunk',
  async (id) => {
    const response = await deleteBrandAPI(id)
    return response.data
  },
)

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsNoPageApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBrandsNoPageApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getBrandsNoPageApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getBrandsApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBrandsApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getBrandsApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getBrandApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBrandApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand,
        )
      })
      .addCase(getBrandApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(postBrandApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(postBrandApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(postBrandApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(putBrandApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(putBrandApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand,
        )
      })
      .addCase(putBrandApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteBrandApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteBrandApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data.filter((brand) => brand.id !== action.payload)
      })
      .addCase(deleteBrandApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default brandSlice.reducer
