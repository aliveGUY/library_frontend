import { useLocation } from "react-router-dom"
import { useGetBookByIdQuery } from "app/api/booksSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'
import defaultCover from 'images/components/coverless-book.png'
import Section from "components/Section"
import Button from "components/Button"

const DefaultCover = () => [
  <img src={defaultCover} />,
  <span className="no-cover-image">No Cover</span>
]

const InfoBook = () => {
  const { pathname } = useLocation()
  const regex = /\/book\/([a-fA-F0-9]+)/
  const id = pathname.match(regex)[1]

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
    const { title, description, author, price } = book
    return (
      <Layout title={`${title} — IMBook`} description={`description: ${description}`}>
        <Section className="book-info-section">
          <div className="book-info-heading">
            <h1>{title}</h1>
            <p>by {author}</p>
          </div>
          <div className="cover-wrapper">
            <div className="cover">
              <DefaultCover />
            </div>
          </div>
          <div className="book-info-body">
            <p className="description">{description}</p>
            <div className="cta">
              <span className="cost">{price} UAH</span>
              <Button theme="grullo">Add to cart</Button>
            </div>
          </div>
        </Section>
      </Layout>
    )
  }
}

export default InfoBook