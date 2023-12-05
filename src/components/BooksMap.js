import Book from "./Book"

const BooksMap = ({ books }) => {
  const booksData = Object.values(books.entities)
  return (
    <div className="books">
      {booksData.map((book, index) => <Book book={book} key={index} />)}
    </div>
  )
}

export default BooksMap
