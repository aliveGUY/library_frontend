import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const booksAdapter = createEntityAdapter({})

const initialState = booksAdapter.getInitialState()

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBooks: builder.query({
      query: () => '/books',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedBooks = responseData.map(book => {
          book.id = book._id
          return book
        })
        return booksAdapter.setAll(initialState, loadedBooks)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Book', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Book', id }))
          ]
        } else return [{ type: 'Book', id: 'LIST' }]
      }
    }),


    getBookById: builder.query({
      query: ({ id }) => `/books/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const { _id: id, ...rest } = responseData
        const loadedBook = { id, ...rest }

        return booksAdapter.setOne(initialState, loadedBook)
      },
      invalidatesTags: [
        { type: 'Book', id: "LIST" }
      ]
    }),

    getBooksByUser: builder.query({
      query: ({ id }) => `/books/added-by/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedBooks = responseData.map(book => {
          book.id = book._id
          return book
        }).reverse()
        return booksAdapter.setAll(initialState, loadedBooks)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Book', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Book', id }))
          ]
        } else return [{ type: 'Book', id: 'LIST' }]
      }
    }),


    searchBook: builder.mutation({
      query: ({ query }) => ({
        url: '/books/search',
        method: 'POST',
        body: { query },
      }),
      invalidatesTags: [
        { type: 'Book', id: "LIST" }
      ]
    }),


    addNewBook: builder.mutation({
      query: initialBook => ({
        url: '/books',
        method: 'POST',
        body: {
          ...initialBook
        }
      }),
      invalidatesTags: [
        { type: 'Book', id: "LIST" }
      ]
    }),


    updateBook: builder.mutation({
      query: initialBook => ({
        url: `/books/${initialBook.id}`,
        method: 'PATCH',
        body: {
          ...initialBook
        }
      }),
      invalidatesTags: [
        { type: 'Book', id: "LIST" }
      ]
    }),

    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'User', id: "LIST" }
      ]
    }),
   
  })
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetBooksByUserQuery,
  useAddNewBookMutation,
  useSearchBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApiSlice

export const selectBooksResult = booksApiSlice.endpoints.getBooks.select()

const selectBooksData = createSelector(
  selectBooksResult,
  booksResult => booksResult.data
)

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectIds: selectBookIds
} = booksAdapter.getSelectors(state => selectBooksData(state) ?? initialState)