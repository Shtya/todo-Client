import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL } from '../config/API';

const user = JSON.parse(localStorage.getItem("user"))


export const Register = createAsyncThunk("/auth/register", async (send) => {
  return baseURL.post("/api/user/signup" , send).then(res=> res.data).catch(err=> err.response.data)
})

export const Login = createAsyncThunk("/auth/login", async (send) => {
  return baseURL.post("/api/user/login" , send).then(res=> res.data).catch(err=> err.response.data)
})


const SliceAuth = createSlice({
  name: "Auth",
  initialState : {},
  reducers: {},
  extraReducers:{
    [Register.pending]: (state) => { state.isLoading = true },
    [Register.fulfilled]: (state, action) => {
      state.isLoading = false
      state.auth = action.payload
    },

    [Register.rejected]: (state, action) => {
      state.isLoading = false
      state.auth = action.payload
    },
    
    [Login.pending]: (state) => { state.isLoading = true },
    [Login.fulfilled]: (state, action) => {
      state.isLoading = false
      state.auth = action.payload
    },

    [Login.rejected]: (state, action) => {
      state.isLoading = false
      state.auth = action.payload
    },

    }
})

export default SliceAuth.reducer