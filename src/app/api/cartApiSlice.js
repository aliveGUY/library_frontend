import { apiSlice } from "./apiSlice"

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCart: builder.mutation({
      query: initialCart => ({
        url: '/cart',
        method: 'POST',
        body: { ...initialCart }
      }),
    }),
    updateCart: builder.mutation({
      query: initialCart => ({
        url: '/cart',
        method: 'PATCH',
        body: { ...initialCart }
      })
    })
  })
})

export const {
  useGetCartMutation,
  useUpdateCartMutation
} = cartApiSlice