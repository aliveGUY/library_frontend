import { useEffect, useState } from "react"
import { useAddAddNewBookMutation } from "../app/api/booksSlice"
import { selectCurrentUser } from "../app/api/authSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"
import LoadingSpinner from "../components/LoadingSpinner"

const priceRegex = /^\$?\d+(\.\d{1,2})?$/


const AddNewBook = () => {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [price, setPrice] = useState("")

  const [addAddNewBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddAddNewBookMutation()

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
      await addAddNewBook(book)
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
      <button type="submit" className="button" disabled={!canSave}>Submit</button>
    </form>
  )
}

export default AddNewBook