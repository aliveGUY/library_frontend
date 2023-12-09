import { useState } from "react"
import Button from "./Button"
import { useSearchBookMutation } from "app/api/booksSlice"
import LoadingSpinner from "./LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { Trans } from "react-i18next"


const BookSearch = () => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const navigate = useNavigate()
  let resultMap

  const [searchBook, {
    isSuccess,
    isLoading,
    isError,
    error
  }] = useSearchBookMutation()

  const handleOnSubmot = async e => {
    e.preventDefault()
    const response = await searchBook({ query })
    if (!response.error) {
      setResult(response.data)
    }
  }

  if (isLoading) resultMap = <LoadingSpinner />
  if (isError && error?.status === 404) {
    resultMap = (
      <div className="error">
        <Trans>No books found</Trans>
      </div>
    )
  } else if (isError) {
    resultMap = <div className="error">{error.data?.error}</div>
  }

  if (isSuccess && result) {
    resultMap = result.map((res, idx) => {
      const { title, author, price, _id: id } = res
      return (
        <li onClick={() => navigate(`/book/${id}`)} className="result-item" key={`search-result-${idx}`}>
          <div className="title-author">
            <h3>{title}</h3>
            <p>
              <Trans>by {{ author }}</Trans>
            </p>
          </div>
          <div className="price">
            <Trans>{{ price }} UAH</Trans>
          </div>
        </li>
      )
    })
  }

  return (
    <form className="book-search" onSubmit={handleOnSubmot}>
      <div className="input">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          required
        />
        <Button theme="grullo">
          <Trans>Search</Trans>
        </Button>
      </div>
      {resultMap &&
        <ul className="serach-result">
          {resultMap}
        </ul>
      }
    </form>
  )
}

export default BookSearch