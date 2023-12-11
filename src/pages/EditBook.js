import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoadingSpinner from "components/LoadingSpinner"
import { useTranslation } from "react-i18next"
import Layout from '../components/Layout'
import Section from "components/Section"
import BookForm from 'components/BookForm'
import { useUpdateBookMutation } from "app/api/booksSlice"
import { useGetBookByIdQuery } from "app/api/booksSlice"
import useAuth from "hooks/useAuth"

const EditBook = () => {
  const { t } = useTranslation()
  const page_title = t("IMBook — Edit Book")

  const { pathname } = useLocation()
  const regex = /\/book\/edit\/([a-fA-F0-9]+)/
  const id = pathname.match(regex)[1]
  const { id: authIndex, roles } = useAuth()

  const {
    data: book,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookByIdQuery({ id })

  const navigate = useNavigate()

  const [updateBook, {
    isLoading: isBookUpdateLoading,
    isSuccess: isBookUpdateSuccess,
    isError: isBookUpdateError,
    error: bookUpdateError
  }] = useUpdateBookMutation()

  useEffect(() => {
    if (isBookUpdateSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  if (isError) {
    console.log(error)
  }

  let form

  if (isLoading) form = <LoadingSpinner />
  if (isSuccess) form = <BookForm callback={updateBook} id={id} book={book.entities[id]} />

  return (
    <Layout title={page_title}>
      <Section>
        {form}
      </Section>
    </Layout>
  )
}

export default EditBook