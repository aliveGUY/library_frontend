import { useLocation, useNavigate } from "react-router-dom"
import { useGetBookByIdQuery } from "app/api/booksSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'
import Section from "components/Section"
import Button from "components/Button"
import { Trans } from 'react-i18next'
import BookCover from "components/BookCover"
import useAuth from "hooks/useAuth"
import { useDeleteBookMutation } from "app/api/booksSlice"
import { useEffect } from "react"

const InfoBook = () => {
  const { pathname } = useLocation()
  const regex = /\/book\/([a-fA-F0-9]+)/
  const id = pathname.match(regex)[1]
  const { id: authIndex, roles } = useAuth()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookByIdQuery({ id })

  const [deleteBook, {
    isLoading: isDeleteBookLoading,
    isSuccess: isDeleteBookSuccess,
  }] = useDeleteBookMutation()

  useEffect(() => {
    if (isDeleteBookSuccess) {
      console.log('ss')
      navigate('/')
    }
  }, [isDeleteBookSuccess, navigate])

  const handleDeleteBook = async e => {
    await deleteBook({ id })
  }

  if (isError) return <Error error={error} />

  if (isLoading || isDeleteBookLoading) return <LoadingSpinner />

  if (isSuccess) {
    const book = data.entities[id]
    const isPermitted = authIndex === book.user || roles.includes("Admin")
    const { title, description, author, price, cover } = book
    return (
      <Layout title={`${title} — IMBook`} description={`description: ${description}`}>
        <Section className="book-info-section">
          {isPermitted && (
            <div className="permited-actions">
              <Button theme="marengo" href={`/book/edit/${id}`}>
                <Trans>Edit Book</Trans>
              </Button>
              <Button theme="danger" onClick={handleDeleteBook}>
                <Trans>Delete Book</Trans>
              </Button>
            </div>
          )}
          <div className="book-info-heading">
            <h1>{title}</h1>
            <p>
              <Trans>by {{ author }}</Trans>
            </p>
          </div>
          <div className="cover-wrapper">
            <BookCover cover={cover} />
          </div>
          <div className="book-info-body">
            <div className="cta">
              <span className="cost">
                <Trans>{{ price }} UAH</Trans>
              </span>
              <Button theme="grullo">
                <Trans>Add to cart</Trans>
              </Button>
            </div>
            <p className="description">{description}</p>
          </div>
        </Section>
      </Layout>
    )
  }
}

export default InfoBook