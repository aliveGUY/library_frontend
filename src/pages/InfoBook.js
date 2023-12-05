import Book from "../components/Book"
import { useLocation } from "react-router-dom"
import { useGetBookByIdQuery } from "../app/api/booksSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"

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
      <div>
        <h2 className="info">Info Book</h2>
        <div className="booky"><Book book={book} disabled /></div>
        <p className="tit">Book title: </p> 
        <p className="desc">{title}</p>
        <p className="cont">Description:</p>
        <p className="desc">{description}</p>
        <p className="aut">Author: </p> 
        <p className="desc">{author}</p>
        <p className="pric"> <span className="pri">Price:<span className="price">{price}</span></span></p>
        
      </div>
    )
  }
}

export default InfoBook