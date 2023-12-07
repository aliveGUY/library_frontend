import Book from "components/Book"
import { useLocation } from "react-router-dom"
import { useGetBookByIdQuery } from "app/api/booksSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import Layout from '../components/Layout'

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
        <h2 className="info">Info Book</h2>
        <Book book={book} disabled />
        <p className="cont">Description:</p>
        <p className="desc">{title}</p>
        <p className="desc">{description}</p>
        <p className="desc">{author}</p>
        <p className="pri">{price}</p>
      </Layout>
    )
  }
}

export default InfoBook