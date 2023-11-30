const Book = ({ book }) => {
  const { title, description, author } = book

  return (
    <div className="book">
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <b className="author">{author}</b>
    </div>
  )
}

export default Book