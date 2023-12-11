import { useLocation } from "react-router-dom"
import { useGetBookByIdQuery } from "app/api/booksSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'
import Section from "components/Section"
import Button from "components/Button"
import { Trans } from 'react-i18next'
import BookCover from "components/BookCover"
import useAuth from "hooks/useAuth"

const InfoBook = () => {
  const { pathname } = useLocation()
  const regex = /\/book\/([a-fA-F0-9]+)/
  const id = pathname.match(regex)[1]
  const { id: authIndex, roles } = useAuth()

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookByIdQuery({ id })

  if (isError) return <Error error={error} />

  if (isLoading) return <LoadingSpinner />

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
                Edit Book
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
              <p className="description">{description}</p>
            </div>
          </div>
        </Section>
      </Layout>
    )
  }
}

export default InfoBook