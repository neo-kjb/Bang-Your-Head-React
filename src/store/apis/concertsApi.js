import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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
            fetchConcertDetails:builder.query({
                query(concertId){
                    return{
                        url:'/concerts',
                        method:'GET',
                        params:{
                            id:concertId
                        }
                
                    }
                }
            })

            

        }
    }
})
export {concertsApi}
export const{useAddConcertMutation,useFetchConcertDetailsQuery,useFetchConcertsQuery,useRemoveConcertMutation}= concertsApi