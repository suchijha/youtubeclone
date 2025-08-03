import { createSlice } from "@reduxjs/toolkit"


const IsLogged =  createSlice({
    name:"IsLogged",
    initialState:false,
    reducers:{
        loginMethod:(state,action)=>{
            state = action.payload
            return state
        }
    }
})

export const {loginMethod} = IsLogged.actions
export default IsLogged.reducer