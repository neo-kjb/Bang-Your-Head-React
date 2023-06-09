import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getAuthToken } from '../../utils/getAuthToken'


const concertsApi=createApi({
    reducerPath:'concerts',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005'
    }),
    tagTypes:['concert'],
    endpoints(builder){
        return{
            addConcert:builder.mutation({
                invalidatesTags: (result, error, concert) => [{ type: 'concert', id: concert.id }],
                
                query:(concert)=>{
                    return{
                        url:'/concerts',
                        method:'POST',
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        },
                        body:{
                            title:concert.title,
                            id:nanoid(),
                            price:concert.price,
                            description:concert.description,
                            location:concert.location,
                            imageUrl:concert.imageUrl,
                            userId:concert.userId,
                        }
                    }
                }
            }),
            removeConcert:builder.mutation({
                invalidatesTags: (result, error, concert) => [{ type: 'concert', id: concert.id }],

                query(concert){
                    return{
                        url:`/concerts/${concert.id}`,
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        },
                        method:'DELETE'
                    }
                }
            }),
            fetchConcerts:builder.query({
                providesTags: (result, error, concert) =>
                result
                  ? [...result.map(({ id }) => ({ type: 'concert', id })), 'concert']
                  : ['concert']
                  ,
                query(){
                    return{
                        url:'/concerts',
                        method:'GET',

                    }
                }
            }),
            fetchConcertDetails: builder.query({
                providesTags: (result, error, concertId) =>
                  result
                    ? [...result.map(({ id }) => ({ type: 'concert', id: concertId })), 'concert']
                    : ['concert']
                ,

                query(concertId) {
                  return {
                    url: `/concerts/${concertId}`,
                    method: 'GET',
                    headers:{
                        Authorization:'Bearer '+ getAuthToken()
                    },
                  };
                },
              }),
            editConcert:builder.mutation({
                invalidatesTags: (result, error, concert) => [{ type: 'concert', id: concert.id }],
                query(concert){
                    return{
                        url:`/concerts/${concert.id}`,
                        method:'PATCH',
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        },
                        body:{
                            title:concert.title,
                            price:concert.price,
                            description:concert.description,
                            location:concert.location,
                            imageUrl:concert.imageUrl,
                        }
                    }
                }
            })

            

        }
    }
})
export {concertsApi}
export const{useAddConcertMutation,useFetchConcertDetailsQuery,useFetchConcertsQuery,useRemoveConcertMutation,useEditConcertMutation}= concertsApi