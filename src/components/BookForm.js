import { useEffect, useState } from "react"
import { useAddNewBookMutation } from "../app/api/booksSlice"
import { selectCurrentUser } from "../app/api/authSlice"
import { useSelector } from "react-redux"
import LoadingSpinner from "./LoadingSpinner"
import { useNavigate } from "react-router-dom"
import Error from "./Error"

const priceRegex = /^\$?\d+(\.\d{1,2})?$/


const BookForm = () => {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [price, setPrice] = useState("")

  const [addNewBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookMutation()

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setDescription('')
      setAuthor('')
      setPrice('')
      navigate('/')
    }
  }, [isSuccess, navigate])

  const canSave = [title, description, author, price, user].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!priceRegex.test(price)) {
      setPrice('')
      return
    }

    const book = {
      title,
      description,
      author,
      price,
      user: user._id,
    }

    if (canSave) {
      await addNewBook(book)
    }
  }

  if (isError) return <Error error={error} />

  return isLoading ? <LoadingSpinner /> : (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        name="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="author">Author:</label>
      <input
        name="author"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />

      <label htmlFor="description">Description:</label>
      <input
        name="description"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label htmlFor="price">Price:</label>
      <input
        name="price"
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button type="submit" disabled={!canSave}>Submit</button>
    </form>
  )
}

export default BookForm