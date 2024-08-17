import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getColorsNoPageAPI,
  getColorsAPI,
  getColorAPI,
  postColorAPI,
  putColorAPI,
  deleteColorAPI,
} from '../../apis/productAPI/Color.jsx'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

// Async thunks
export const getColorsNoPageApiThunk = createAsyncThunk(
  'colors/getColorsNoPageApiThunk',
  async () => {
    const response = await getColorsNoPageAPI()
    return response.data
  },
)

export const getColorsApiThunk = createAsyncThunk(
  'colors/getColorsApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getColorsAPI(pageSize, pageNumber, sort, search)
      console.log(response)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      )
    }
  },
)

export const getColorApiThunk = createAsyncThunk(
  'colors/getColorApiThunk',
  async (id) => {
    const response = await getColorAPI(id)
    return response.data
  },
)

export const postColorApiThunk = createAsyncThunk(
  'colors/postColorApiThunk',
  async (color) => {
    const response = await postColorAPI(color)
    return response.data
  },
)

export const putColorApiThunk = createAsyncThunk(
  'colors/putColorApiThunk',
  async (color) => {
    const response = await putColorAPI(color)
    return response.data
  },
)

export const deleteColorApiThunk = createAsyncThunk(
  'colors/deleteColorApiThunk',
  async (id) => {
    const response = await deleteColorAPI(id)
    return response.data
  },
)

// Slice
const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColorsNoPageApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorsNoPageApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getColorsNoPageApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getColorsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getColorsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.map((color) =>
          color.id === action.payload.id ? action.payload : color,
        )
      })
      .addCase(getColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload)
      })
      .addCase(postColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(putColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(putColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.map((color) =>
          color.id === action.payload.id ? action.payload : color,
        )
      })
      .addCase(putColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((color) => color.id !== action.meta.arg)
      })
      .addCase(deleteColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default colorSlice.reducer
