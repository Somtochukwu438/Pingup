import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'
import toast from 'react-hot-toast'


const initialState = {
    value: null
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token, { rejectWithValue }) => {
      try {
        const { data } = await api.get('/api/user/data', {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("data", data)
        return data.success ? data.user : null
      } catch (err) {
        console.error(
          "fetchUser error:",
          err.response?.status,
          err.response?.data || err.message
        )
        return rejectWithValue(err.response?.data || err.message)
      }
    }
  )
  

export const updateUser = createAsyncThunk('user/update', async ({userData ,token}) => {
    const { data } = await api.post('/api/user/update', userData, {
        headers: {Authorization: `Bearer ${token}`}
    })
    if(data.success){
        toast.success(data.message)
        return data.user
    }else{
        toast.error(data.message)
        return null
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.value = action.payload
        }).addCase(updateUser.fulfilled, (state, action)=>{
            state.value = action.payload
        })
    }
})

export default userSlice.reducer