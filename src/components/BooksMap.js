import Book from "./Book"

const BooksMap = ({ books }) => {
  return (
    <div className="books">
      {books.map((book, index) => <Book book={book} key={index} />)}
    </div>
  )
}

export default BooksMap
