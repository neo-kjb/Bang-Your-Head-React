import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/usersApi';
import { reviewsApi } from './apis/reviewsApi';
import { concertsApi } from './apis/concertsApi';
import { currentUserSlice } from './slices/currentUserSlice';


const store =configureStore({
    reducer:{
       [usersApi.reducerPath]:usersApi.reducer,
       [reviewsApi.reducerPath]:reviewsApi.reducer,
       [concertsApi.reducerPath]:concertsApi.reducer,
       currentUser:currentUserSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(usersApi.middleware).concat(reviewsApi.middleware).concat(concertsApi.middleware)
    }
})

setupListeners(store.dispatch)

export {store}
export const clearCurrentUser=currentUserSlice.actions.clearCurrentUser
export const setCurrentUser=currentUserSlice.actions.setCurrentUser
export {useAddUserMutation,useLoginUserMutation}from './apis/usersApi'
export {useAddReviewMutation,useFetchReviewsQuery,useRemoveReviewMutation}from './apis/reviewsApi'
export {useAddConcertMutation,useFetchConcertDetailsQuery,useFetchConcertsQuery,useRemoveConcertMutation}from'./apis/concertsApi'