import { DELETE_BOOK } from "../constants/reducerActions"
import { useBooksContext } from "../hooks/useBooksContext"

const Book = ({ book }) => {
  const { title, description, author, _id } = book
  const { dispatch } = useBooksContext()

  const handleDelete = async () => {
    const response = await fetch(`https://library-uni-project-api.onrender.com/books/${_id}`, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: DELETE_BOOK, payload: json })
      console.log('deleted book ', json)
    }
  }

  return (
    <div className="book">
      <h3 className="title">{title}</h3>
      <hr color="#000000" />
      <p className="description">{description}</p>
      <b className="author">by {author}</b>
      <span onClick={handleDelete}>delete</span>
    </div>
  )
}

export default Book