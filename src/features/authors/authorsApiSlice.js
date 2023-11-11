import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"; 



const authorsAdapter = createEntityAdapter({})
const initialState = authorsAdapter.getInitialState()


export const authorsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAuthors: builder.query({
      query: () => '/authors',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformErrorResponse: responseData => {
        const loadedAuthors = responseData.map(author => {
          author.id = author._id
          return author
        })

        return authorsAdapter.setAll(initialState, loadedAuthors)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Author', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Author', id }))
          ]
        } else return [{ type: 'Author', id: 'LIST' }]
      }
    })
  })
})

export const { useGetAuthorsQuery } = authorsApiSlice

export const selectAuthorResult = authorsApiSlice.endpoints.getAuthors.select()

const selectAuthorData = createSelector(
  selectAuthorResult,
  authorResult => authorResult.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllAuthor,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the author slice of state
} = authorsAdapter.getSelectors(state => selectAuthorData(state) ?? initialState)