import { useEffect } from "react"
import Book from "../components/Book"
import BookForm from "../components/BookForm"
import { useBooksContext } from "../hooks/useBooksContext"
import { SET_BOOKS } from "../constants/reducerActions"

const Home = () => {
  const { books, dispatch } = useBooksContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://library-uni-project-api.onrender.com/books')
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: SET_BOOKS, payload: json })
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