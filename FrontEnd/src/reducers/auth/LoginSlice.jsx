import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginByAdmin, loginByUser } from '../../apis/auth/Login'

const initialState = {
  id: null,
  email: null,
  role: null,
  token: null,
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
}

export const loginByAdminThunk = createAsyncThunk(
  'loginByAdmin/loginByAdminThunk',
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
  'loginByUser/loginByUserThunk',
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
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null
      state.email = null
      state.role = null
      state.token = null
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByAdminThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginByAdminThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
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
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginByUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginByUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.email = action.payload.email
        state.token = action.payload.token
        state.role = action.payload.role
        state.id = action.payload.id
        localStorage.setItem('email', JSON.stringify(action.payload.email))
        localStorage.setItem('role', JSON.stringify(action.payload.role))
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('id', JSON.stringify(action.payload.id))
        if (action.payload.role === 'User') {
          window.location.href = '/'
        }
      })
      .addCase(loginByUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = LoginSlice.actions

export default LoginSlice.reducer
