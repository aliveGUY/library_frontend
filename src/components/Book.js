import { useNavigate } from "react-router-dom"

const Book = ({ book, disabled }) => {
  const { _id: id, title, description, author } = book
  const navigate = useNavigate()
  const handleEdit = () => navigate(`/book/${id}`)

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