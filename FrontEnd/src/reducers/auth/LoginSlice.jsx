import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginAPI } from '../../apis/auth/Login'

const initialState = {
  email: null,
  role: null,
  token: null,
  loading: false,
  error: null,
}

export const LoginApiThunk = createAsyncThunk(
  'login/postShoeApiThunk',
  async (user, { rejectWithValue }) => {
    try {
      const response = await LoginAPI(user)
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
      .addCase(LoginApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(LoginApiThunk.fulfilled, (state, action) => {
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
      .addCase(LoginApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = LoginSlice.actions

export default LoginSlice.reducer
