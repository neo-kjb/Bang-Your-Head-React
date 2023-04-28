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
                invalidatesTags:(results)=>{

                    return[{type:'Concert',id:results.id}]
                },
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
                providesTags:(results,error,concert)=>{
                    const tags=results.map((concert)=>{
                        return{type:'Concert',id:concert.id}
                    })
                    
                    return tags
                },
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