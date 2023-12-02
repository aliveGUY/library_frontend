import { useNavigate } from "react-router-dom"
import { selectBookById } from "../app/api/booksSlice"
import { useSelector } from "react-redux"

const Book = ({ bookId }) => {
  const navigate = useNavigate()
  const user = useSelector(state => selectBookById(state, bookId))

  if (!user) return null

  const handleEdit = () => navigate(`/books/${bookId}`)

  return (
    <div className="book" onClick={handleEdit}>
      <h3 className="title">{user.title}</h3>
      <hr color="#000000" />
      <p className="description">{user.description}</p>
      <b className="author">by {user.author}</b>
    </div>
  )
}

export default Book