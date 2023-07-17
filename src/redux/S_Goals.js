import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../config/API";



const config = {
  headers :{Authorization : `Bearer ${ localStorage.getItem("todouser") && JSON.parse(localStorage.getItem("todouser"))?.token }`}
}

export const GET_Goals = createAsyncThunk("GET/Goals", async () => {
  return baseURL.get(`/api/goals`,config).then(res => res.data).catch(err=> err.response.data)
})

export const POST_Goals = createAsyncThunk("POST/Goals", async (send) => {
  return baseURL.post(`/api/goals`,send,config).then(res => res.data).catch(err=> err.response.data)
})


export const DELETE_Goals = createAsyncThunk("DELETE/Goals", async (id) => {
  return baseURL.delete(`/api/goals/${id}`,config).then(res => res.data).catch(err=> err.response.data)
})
export const PUT_Goals = createAsyncThunk("PUT/Goals", async ({id , ...send}) => {
  return baseURL.put(`/api/goals/${id}` , send ,config).then(res => res.data).catch(err=> err.response.data)
})


export const GetToDo = createAsyncThunk("get/todos", async () => {
  return baseURL.get(`/api/goals?complete=false`,config).then(res => res.data).catch(err=> err.response.data)
})
export const GetToDoComplete = createAsyncThunk("get/todos", async () => {
  return baseURL.get(`/api/goals?complete=true`,config).then(res => res.data).catch(err=> err.response.data)
})

export const PostToDo = createAsyncThunk("post/todo", async (send) => {
  return baseURL.post(`/api/goals`,send,config).then(res => res.data).catch(err=> err.response.data)
})

export const DeleteToDo = createAsyncThunk("delete/todo", async (id) => {
  return baseURL.delete(`/api/goals/${id}`,config).then(res => res.data).catch(err=> err.response.data)
})

export const PutToDo = createAsyncThunk("put/todo", async ({id , send}) => {
  return baseURL.put(`/api/goals/${id}` , {text:send} ,config).then(res => res.data).catch(err=> err.response.data)
})



const SliceGoals = createSlice({
  name: "Goals",
  initialState: {
    todo:[],
    todoComplete:[]
  },
  reducers: {},
  extraReducers: {
    [GetToDo.pending]:(state)=> {state.isloading = true},
    [GetToDo.fulfilled]: (state, action) => {
      state.isloading = false
      state.todo = action.payload
    },


    [PostToDo.pending]:(state)=> {state.isloading = true},
    [PostToDo.fulfilled]: (state, action) => {
      state.isloading = false
      state.todo.data.unshift(action.payload.data)
    },

    [DeleteToDo.fulfilled]: (state, action) => {
      state.todo.data = state.todo.data.filter(e=>  e?._id !== action.payload.data._id )
    },

    [PutToDo.fulfilled]: (state, action) => {
      state.todo.data.map(e=> {
        if(e?._id === action.payload.data._id){
          e.text = action.payload.data.text
        }
      })
    },




    [POST_Goals.pending]:(state)=> {state.load = true},
    [POST_Goals.fulfilled]: (state, action) => {
      state.load = false
      state.goals = action.payload
    },


    [GET_Goals.pending]:(state)=> {state.load = true},
    [GET_Goals.fulfilled]: (state, action) => {
      state.load = false
      state.goals = action.payload
    },
    [GET_Goals.rejected]: (state, action) => {
      state.load = false
      state.goals = action.payload
    },


    [PUT_Goals.pending]:(state)=> {state.load = true},
    [PUT_Goals.fulfilled]: (state, action) => {
      state.load = false
      state.goals = action.payload
    },
    [PUT_Goals.rejected]: (state, action) => {
      state.load = false
      state.goals = action.payload
    },
  }
})


export default SliceGoals.reducer