import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const concertsApi=createApi({
    reducerPath:'concerts',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            addConcert:builder.mutation({
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
                query(concert){
                    return{
                        url:`/concerts/${concert.id}`,
                        method:'DELETE'
                    }
                }
            }),
            fetchConcerts:builder.query({
                query(){
                    return{
                        url:'/concerts',
                        method:'GET',

                    }
                }
            }),
            fetchConcertDetails:builder.query({
                query(concert){
                    return{
                        url:'/concerts',
                        method:'GET',
                        params:{
                            id:concert.id
                        }
                
                    }
                }
            })

            

        }
    }
})
export {concertsApi}
export const{useAddConcertMutation,useFetchConcertDetailsQuery,useFetchConcertsQuery,useRemoveConcertMutation}= concertsApi