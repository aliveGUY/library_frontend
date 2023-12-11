import { useNavigate } from "react-router-dom"
import defaultImage from "images/components/coverless-book.png"
import { Trans } from 'react-i18next'
import BookCover from "./BookCover"

const DefaultCover = () => [
  <img key="default-cover-img" src={defaultImage} alt="default cover" />,
  <span key="default-cover-img-message" className="no-cover-image">
    <Trans>No Cover</Trans>
  </span>
]

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