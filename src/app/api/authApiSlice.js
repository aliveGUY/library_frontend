import { apiSlice } from "./apiSlice"
import { logOut, setCredentials } from "./authSlice"
import { clearCart } from "./cartSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;  // Wait for the query to complete
          dispatch(logOut());    // Dispatch logOut after the query is fulfilled
          dispatch(clearCart());  // Now dispatch clearCart
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { user } = data
          dispatch(setCredentials({ user }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice 
