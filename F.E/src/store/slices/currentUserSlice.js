import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice=createSlice({
    name:'currenUser',
    initialState:{
        currentUserAccessToken:'',
        currentUserId:'',
        currentUserEmail:'',
        currentUserName:''
    },
    reducers:{

        setCurrentUser(state,action){
            state.currentUserAccessToken=action.payload.accessToken
            state.currentUserEmail=action.payload.email
            state.currentUserId=action.payload.id
            state.currentUserName=action.payload.name
        },
        clearCurrentUser(state,action){
            state.currentUserAccessToken=''
            state.currentUserId=''
            state.currentUserEmail=''
            state.currentUserName=''
        }
    }
})


export {currentUserSlice}