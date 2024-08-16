import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getAccountsAPI,
  putAccountAPI,
  getAccountAndUserInformationByIdAPI,
  updateAccountInformationUserAPI,
} from '../../apis/user/Account.jsx'

const initialState = {
  data: [],
  accountDetail: null,
  status: 'idle', // Idle, loading, succeeded, failed
  error: null,
}

export const getAccountsApiThunk = createAsyncThunk(
  'getAccountsAPI/getAccountsApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getAccountsAPI(pageSize, pageNumber, sort, search)
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

export const getAccountAndUserInformationByIdApiThunk = createAsyncThunk(
  'getAccountAndUserInformationAPI/getAccountAndUserInformationByIdApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAccountAndUserInformationByIdAPI(id)
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

export const updateAccountInformationUserApiThunk = createAsyncThunk(
  'updateAccountInformationAPI/updateAccountInformationUserApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('accountId', payload.accountId)
      formData.append('address', payload.address)
      formData.append('fullname', payload.fullname)
      formData.append('gender', payload.gender)
      formData.append('email', payload.email)
      formData.append('birthday', payload.birthday)
      formData.append('phoneNumber', payload.phoneNumber)
      const response = await updateAccountInformationUserAPI(formData)
      console.log(response)
      return response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const putAccountApiThunk = createAsyncThunk(
  'putAccountAPI/putAccountApiThunk',
  async (account) => {
    const response = await putAccountAPI(account)
    return response.data
  },
)

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getAccountsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getAccountsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(putAccountApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(putAccountApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Update the specific account in the state
        state.data = state.data.map((account) =>
          account.id === action.payload.id ? action.payload : account,
        )
      })
      .addCase(putAccountApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getAccountAndUserInformationByIdApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        getAccountAndUserInformationByIdApiThunk.fulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.accountDetail = action.payload
        },
      )
      .addCase(
        getAccountAndUserInformationByIdApiThunk.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload
        },
      )
      .addCase(updateAccountInformationUserApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        updateAccountInformationUserApiThunk.fulfilled,
        (state, action) => {
          state.status = 'succeeded'
          // Optionally update the accountDetail if needed
          state.accountDetail = {
            ...state.accountDetail,
            ...action.payload.data,
          }
          console.log(state.accountDetail)
        },
      )
      .addCase(
        updateAccountInformationUserApiThunk.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload
        },
      )
  },
})

export default accountSlice.reducer
