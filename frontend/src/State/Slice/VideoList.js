import { createSlice } from "@reduxjs/toolkit"


const VideoList =  createSlice({
    name:"VideoList",
    initialState:[],
    reducers:{
        videoListMethod:(state,action)=>{
            state = action.payload
            return state
        }
    }
})

export const {videoListMethod} = VideoList.actions
export default VideoList.reducer