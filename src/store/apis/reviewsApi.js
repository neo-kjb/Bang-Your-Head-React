import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const reviewsApi=createApi({
    reducerPath:'reviwes',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            addReview:builder.mutation({
                query:(review)=>{
                    return{
                        url:'/reviews',
                        method:'POST',
                        body:{
                            reviewText:review.reviewText,
                            reviewRating:review.ratingValue,
                            userId:review.userId,
                            userName:review.userName,
                            concertId:review.concertId,
                            id:nanoid()
                        }
                    }
                }
            }),
            removeReview:builder.mutation({
                query:(review)=>{
                    return{
                        url:`/reviews/${review.id}`,
                        method:'DELETE',

                    }
                }
            }),
            fetchReviews:builder.query({
                query:(concert)=>{
                    return{
                        url:'/reviews',
                        method:'GET',
                        params:{
                            concertId:concert.id
                        }
                    }
                }
            })
        }
    }
})

export{reviewsApi}
export const{useAddReviewMutation,useFetchReviewsQuery,useRemoveReviewMutation}=reviewsApi