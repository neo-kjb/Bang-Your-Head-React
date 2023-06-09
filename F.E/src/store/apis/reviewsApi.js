import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/getAuthToken'

const reviewsApi=createApi({
    reducerPath:'reviwes',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005'
    }),
    tagTypes:['review'],
    endpoints(builder){
        return{
            addReview:builder.mutation({
                invalidatesTags: (result, error, review) => [{ type: 'review', id: review.concertId }],

                query:(review)=>{
                    return{
                        url:'/reviews',
                        method:'POST',
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        },
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
                invalidatesTags: (result, error, review) => [{ type: 'review', id: review.id }],

                query:(review)=>{
                    return{
                        url:`/reviews/${review.id}`,
                        method:'DELETE',
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        },

                    }
                }
            }),
            fetchReviews:builder.query({
                providesTags:(result,error,concert)=>{
                    const tags=result.map((review)=>{
                        return{type:'review',id:review.id}
                    })
                    tags.push({type:'review', id:concert.id})
                    return tags
                },
                query:(concert)=>{
                    return{
                        url:`/reviews/${concert.id}`,
                        method:'GET',

                    }
                }
            })
        }
    }
})

export{reviewsApi}
export const{useAddReviewMutation,useFetchReviewsQuery,useRemoveReviewMutation}=reviewsApi