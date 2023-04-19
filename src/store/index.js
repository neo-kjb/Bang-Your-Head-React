import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/usersApi';
import { reviewsApi } from './apis/reviewsApi';
import { concertsApi } from './apis/concertsApi';


const store =configureStore({
    reducer:{
       [usersApi.reducerPath]:usersApi.reducer,
       [reviewsApi.reducerPath]:reviewsApi.reducer,
       [concertsApi.reducerPath]:concertsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(usersApi.middleware).concat(reviewsApi.middleware).concat(concertsApi.middleware)
    }
})

setupListeners(store.dispatch)

export {store}
export {useAddUserMutation}from './apis/usersApi'
export {useAddReviewMutation,useFetchReviewsQuery,useRemoveReviewMutation}from './apis/reviewsApi'