import { useNavigate } from "react-router-dom"
import { selectBookById } from "../app/api/booksSlice"
import { useSelector } from "react-redux"


const Book = ({ book, bookId, disabled }) => {
  const navigate = useNavigate()
  const { title, description, author } = useSelector(state => selectBookById(state, bookId)) || book
  const handleEdit = () => navigate(`/book/${bookId}`)

  return (
    <button className="book" onClick={handleEdit} disabled={disabled}>
      <h3 className="title">{title}</h3>
      <hr />
      <p className="description">{description}</p>
      <b className="author">by {author}</b>
    </button>
  )
}

export default Book