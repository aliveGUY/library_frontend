import { useState, useEffect } from "react"
import Book from "../components/Book"


const InfoBook = () => {
    
    const [book, sitebook] = useState()
    console.log (book)
    useEffect(() => {
        const fetchBooks = async () => {
          const response = await fetch('https://library-uni-project-api.onrender.com/books/6569cfa473b3fd5ca88983f9')
          const json = await response.json()
          if (response.ok) {
            sitebook( json )
          }
        }
        fetchBooks()
      }, [])
    
      if (!book) {
        return
      }

    return (<div>
        <h2 className="info">Info Book</h2>
        {book&&<Book book ={book}  />}
        <p className="cont">Description:</p>
        <p className="desc">{book.description}</p>
        <p className="pri">{book.price}</p>
    </div>)
}

export default InfoBook