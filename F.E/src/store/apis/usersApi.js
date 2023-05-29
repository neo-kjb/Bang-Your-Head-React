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
                invalidatesTags:()=>['user'],
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
                invalidatesTags:()=>['user'],

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
                providesTags:()=>['user'],
                query:()=>{
                    return{
                        url:'/auth',
                        method:'GET',
                        headers:{
                            Authorization:'Bearer '+ getAuthToken()
                        }
                    }
                }
            }),
            logout: builder.mutation({
                invalidatesTags: () => ['user'],
                query: () => ({
                  url: '/logout',
                  method: 'POST',
                  headers: {
                    Authorization: 'Bearer ' + getAuthToken(),
                  },
                }),
              })
        }
    }
})

export {usersApi}
export const {useAddUserMutation,useLoginUserMutation,useGetCurrentUserQuery,useLogoutMutation}=usersApi