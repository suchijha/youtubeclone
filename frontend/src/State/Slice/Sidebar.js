import { createSlice } from "@reduxjs/toolkit"


const SidebarSlice =  createSlice({
    name:"Sidebar",
    initialState:false,
    reducers:{
        sidbarMethod:(state,action)=>{
            state = action.payload
            return state
        }
    }
})

export const {sidbarMethod} = SidebarSlice.actions
export default SidebarSlice.reducer