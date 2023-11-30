import { useState } from "react"

const BookForm = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [author, setAuthor] = useState()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const book = {
      title,
      description,
      author
    }

    const response = await fetch('https://library-uni-project-api.onrender.com/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(json.error)
      setTitle('')
      setDescription('')
      setAuthor('')
      console.log('new book added ', json)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <label for="title">Title:</label>
      <input name="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label for="author">Author:</label>
      <input name="author" type="text" onChange={(e) => setAuthor(e.target.value)} value={author} />
      <label for="description">Description:</label>
      <input name="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default BookForm