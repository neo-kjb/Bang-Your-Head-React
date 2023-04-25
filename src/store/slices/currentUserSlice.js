import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice=createSlice({
    name:'currenUser',
    initialState:{
        accessToken:'',
        userId:'',
        email:''
    },
    reducers:{

        setUser(state,action){
            state.accessToken=action.payload.accessToken
            state.email=action.payload.email
            state.userId=action.payload.id
        },
        clearUser(state,action){
            state.accessToken=''
            state.userId=''
            state.email=''
        }
    }
})


export {currentUserSlice}