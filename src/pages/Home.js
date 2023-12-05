import { useGetBooksQuery } from "../app/api/booksSlice"
import LoadingSpinner from "../components/LoadingSpinner"
import Error from "../components/Error"
import BooksMap from "../components/BooksMap"

const Home = () => {
  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksQuery()

  let content

  if (isError) content = <Error error={error} />
  if (isLoading) content = <LoadingSpinner />

  if (isSuccess) {
    content = (
      <div className="Home">
        <BooksMap books={books}/>
      </div>
    )
  }

  return content
}

export default Home