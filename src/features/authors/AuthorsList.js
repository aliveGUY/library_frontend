import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGetAuthorsQuery } from "./authorsApiSlice"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const AuthorsList = () => {
    const {
        data: authors,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAuthorsQuery()

    let content = ''
    if (isLoading) {
        content = <p>Завантаження...</p>
    }

    if (isError) {
        content = (
            <div>
                <p>Error</p>
                <p>{error}</p>
            </div>
        )
    }

    if (isSuccess) {
        content = authors.map((author, key) => (
            <li key={key}>
                <FontAwesomeIcon icon={faUser} />
                <span>{author.username}</span>
            </li>
        ))

    }

    return (
        <div>
            <h1>Автори:</h1>
            <ul>
                {content}
            </ul>
        </div>
    )
}

export default AuthorsList