import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoadingSpinner from "components/LoadingSpinner"
import { Trans, useTranslation } from "react-i18next"
import Layout from '../components/Layout'
import Section from "components/Section"
import BookForm from 'components/BookForm'
import { useUpdateBookMutation } from "app/api/booksApiSlice"
import { useGetBookByIdQuery } from "app/api/booksApiSlice"
import useAuth from "hooks/useAuth"

const EditBook = () => {
  const { t } = useTranslation()
  const page_title = t("IMBook — Edit Book")
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  const user = useAuth()
  const loggedIn = Boolean(user?.username)
  const isAdmin = Boolean(user?.roles.includes('Admin'))


  const {
    data: book,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookByIdQuery({ id })

  if (!loggedIn || (book?.user !== user.id || !isAdmin)) {
    navigate('/')
  }

  const [updateBook, {
    isLoading: isBookUpdateLoading,
    isSuccess: isBookUpdateSuccess,
    isError: isBookUpdateError,
    error: bookUpdateError
  }] = useUpdateBookMutation()

  useEffect(() => {
    if (isBookUpdateSuccess) {
      navigate(-1)
    }
  }, [isBookUpdateSuccess, navigate])

  if (isError || isBookUpdateError) {
    console.log(error || bookUpdateError)
  }

  if (isLoading || isBookUpdateLoading) return <LoadingSpinner />

  return (
    <Layout title={page_title}>
      <Section className="edit-book-section">
        <h1>
          <Trans>Edit a book</Trans>
        </h1>
        <BookForm callback={updateBook} id={id} book={book} />
      </Section>
    </Layout>
  )
}

export default EditBook