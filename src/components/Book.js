import { useNavigate } from "react-router-dom"
import defaultImage from "images/components/coverless-book.png"

const DefaultCover = () => [
  <img src={defaultImage} />,
  <span className="no-cover-image">No Cover</span>
]

const Book = ({ book, disabled }) => {
  const { _id: id, title, description, author } = book
  const navigate = useNavigate()
  const handleEdit = () => navigate(`/book/${id}`)

  return (
    <button className="book" onClick={handleEdit} disabled={disabled}>
      <div className="cover">
        <DefaultCover />
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