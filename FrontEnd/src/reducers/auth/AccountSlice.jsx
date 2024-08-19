import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getAccountsAPI,
  putAccountAPI,
  getAccountAndUserInformationByIdAPI,
  updateAccountInformationUserAPI,
  getTokenUdpatePasswordAPI,
  updatePasswordAPI,
  getTokenUpdateEmailAPI,
  updateEmailAPI,
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
      formData.append('phone', payload.phoneNumber)
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

export const getTokenUpdatePasswordApiThunk = createAsyncThunk(
  'getTokenUpdatePasswordAPI/getTokenUpdatePasswordApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTokenUdpatePasswordAPI()
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

export const updatePasswordApiThunk = createAsyncThunk(
  'updatePasswordAPI/updatePasswordApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('token', payload.tokenUpdatePassword)
      formData.append('newPassword', payload.newPassword)
      formData.append('oldPassword', payload.oldPassword)
      const response = await updatePasswordAPI(formData)
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

export const getTokenUpdateEmailApiThunk = createAsyncThunk(
  'getTokenUpdateEmailAPI/getTokenUpdateEmailApiThunk',
  async ({ newEmail }, { rejectWithValue }) => {
    try {
      const response = await getTokenUpdateEmailAPI(newEmail)
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

export const updateEmailApiThunk = createAsyncThunk(
  'updateEmailAPI/updateEmailApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('token', payload.tokenUpdateEmail)
      formData.append('newEmail', payload.newEmail)
      const response = await updateEmailAPI(formData)
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
      .addCase(getTokenUpdatePasswordApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getTokenUpdatePasswordApiThunk.fulfilled, (state) => {
        state.status = 'succeededGetTokenUpdatePassword'
      })
      .addCase(getTokenUpdatePasswordApiThunk.rejected, (state, action) => {
        state.status = 'failedGetTokenUpdatePassword'
        state.error = action.payload
      })
      .addCase(getTokenUpdateEmailApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getTokenUpdateEmailApiThunk.fulfilled, (state) => {
        state.status = 'succeededGetTokenUpdateEmail'
      })
      .addCase(getTokenUpdateEmailApiThunk.rejected, (state, action) => {
        state.status = 'failedGetTokenUpdateEmail'
        state.error = action.payload
      })
      .addCase(updatePasswordApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updatePasswordApiThunk.fulfilled, (state) => {
        state.status = 'succeededUpdatePassword'
      })
      .addCase(updatePasswordApiThunk.rejected, (state, action) => {
        state.status = 'failedUpdatePassword'
        state.error = action.payload
      })
      .addCase(updateEmailApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateEmailApiThunk.fulfilled, (state) => {
        state.status = 'succeededUpdateEmail'
      })
      .addCase(updateEmailApiThunk.rejected, (state, action) => {
        state.status = 'failedUpdateEmail'
        state.error = action.payload
      })
  },
})

export default accountSlice.reducer
