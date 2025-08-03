import { createSlice } from "@reduxjs/toolkit"


const Video =  createSlice({
    name:"Video",
    initialState:{},
    reducers:{
        videosMethod:(state,action)=>{
            state = action.payload
            console.log(action.payload)
            return state
        }
    }
})

export const {videosMethod} = Video.actions
export default Video.reducer