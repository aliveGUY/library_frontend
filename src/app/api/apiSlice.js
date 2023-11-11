import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-uni-project-api.onrender.com' }),
    tagTypes: ['Book', 'Order', 'User'],
    endpoints: builder => ({})
})