import { useNavigate } from "react-router-dom"
import BookCover from "./BookCover"

const Book = ({ book, disabled }) => {
  const { _id: id, title, description, author, cover } = book
  const navigate = useNavigate()
  const handleEdit = () => navigate(`/book/${id}`)

  return (
    <button className="book" onClick={handleEdit} disabled={disabled}>
      <div className="cover">
        <BookCover cover={cover}/>
      </div>
      <div className="text">
        <div className="title">
          {title}
        </div>
      </div>
    </button>
  )
}

export default Book