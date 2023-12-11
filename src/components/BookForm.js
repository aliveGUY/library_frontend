import useAuth from "hooks/useAuth"
import { useState } from "react"
const priceRegex = /^\$?\d+(\.\d{1,2})?$/


const { default: convertToBase64 } = require("helpers/conertToBase64")
const { default: BookCover } = require("./BookCover")
const { default: Button } = require("./Button")

const BookForm = ({ callback, book, id }) => {
  const user = useAuth()
  const [cover, setCover] = useState(book?.cover || "")
  const [title, setTitle] = useState(book?.title || "")
  const [description, setDescription] = useState(book?.description || "")
  const [author, setAuthor] = useState(book?.author || "")
  const [price, setPrice] = useState(book?.price || "")

  const handleCoverChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file)
      convertToBase64(url, base64 => {
        setCover(base64);
      })
    }
  }

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
      user: user.id,
      cover,
    }
    if (id) book.id = id

    try {
      await callback(book)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="book-form">

      <label htmlFor="cover" className="form-cover-wrapper" data-icon="&#x270E;">
        <BookCover cover={cover} />
      </label>
      <input
        type="file"
        id="cover"
        name="cover"
        onChange={handleCoverChange}
        accept="image/*"
      />

      <label htmlFor="title">Title</label>
      <input
        name="title"
        data-testid="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="author">Author</label>
      <input
        name="author"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />

      <label htmlFor="description">Description</label>
      <textarea
        data-testid="description"
        className="description"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        type="text"
      />

      <label htmlFor="price">Price</label>
      <input
        data-testid="price"
        name="price"
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <Button theme="good" className="submit" type="submit">Submit</Button>
    </form>
  )
}

export default BookForm