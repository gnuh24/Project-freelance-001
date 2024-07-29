import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginByAdmin, loginByUser } from '../../apis/auth/Login'

const initialState = {
  id: null,
  email: null,
  role: null,
  token: null,
  loading: false,
  error: null,
}

export const loginByAdminThunk = createAsyncThunk(
  'loginByAdmin/postShoeApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginByAdmin(payload)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
export const loginByUserThunk = createAsyncThunk(
  'loginByUser/postShoeApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginByUser(payload)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByAdminThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginByAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.email = action.payload.email
        state.token = action.payload.token
        state.role = action.payload.role
        localStorage.setItem('email', JSON.stringify(action.payload.email))
        localStorage.setItem('role', JSON.stringify(action.payload.role))
        localStorage.setItem('token', action.payload.token)
        if (action.payload.role === 'Admin') {
          window.location.href = '/dashboard'
        }
      })
      .addCase(loginByAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginByUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginByUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.email = action.payload.email
        state.token = action.payload.token
        state.role = action.payload.role
        state.id = action.payload.id
        localStorage.setItem('email', JSON.stringify(action.payload.email))
        localStorage.setItem('role', JSON.stringify(action.payload.role))
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('id', action.payload.id)
        if (action.payload.role === 'User') {
          window.location.href = '/'
        }
      })
      .addCase(loginByUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = LoginSlice.actions

export default LoginSlice.reducer
