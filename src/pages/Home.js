import { useEffect, useState } from "react"
import Book from "../components/Book"
import BookForm from "../components/BookForm"

const Home = () => {
  const [books, setBooks] = useState()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://library-uni-project-api.onrender.com/books')
      const json = await response.json()
      if (response.ok) {
        setBooks(json)
      }
    }
    fetchBooks()
  }, [])

  return (
    <div className="Home">
      <div className="books">
        {books && books.map((book) =>
          <Book book={book} key={book._id} />
        )}
      </div>
      <BookForm />
    </div>
  )
}

export default Home