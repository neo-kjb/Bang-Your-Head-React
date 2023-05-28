import { nanoid } from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react'


import { getAuthToken } from '../../utils/getAuthToken'
const token=getAuthToken()


const usersApi=createApi({
    reducerPath:'users',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3005'
    }),
    endpoints(builder){
        return{
            addUser:builder.mutation({
                query:(user)=>{
                    return{
                        url:'/users',
                        method:'POST',
                        body:{
                            name:user.name,
                            id:nanoid(),
                            email:user.email,
                            password:user.password
                        }
                    }
                }
            }),
            loginUser:builder.mutation({
                query:(user)=>{
                    return{
                        url:'/login',
                        method:'POST',
                        body:{
                            email:user.email,
                            password:user.password
                        },
                    }
                }
            }),
            getCurrentUser:builder.query({
                query:()=>{
                    return{
                        url:'/auth',
                        method:'GET',
                        headers:{
                            Authorization:'Bearer '+ token
                        }
                    }
                }
            })
        }
    }
})

export {usersApi}
export const {useAddUserMutation,useLoginUserMutation,useGetCurrentUserQuery}=usersApi