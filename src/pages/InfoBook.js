import { useLocation, useNavigate } from "react-router-dom"
import { useGetBookByIdQuery } from "app/api/booksApiSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Layout from '../components/Layout'
import Section from "components/Section"
import Button from "components/Button"
import { Trans } from 'react-i18next'
import BookCover from "components/BookCover"
import useAuth from "hooks/useAuth"
import { useDeleteBookMutation } from "app/api/booksApiSlice"
import { useEffect, useState } from "react"
import useCart from "hooks/useCart"
import { useUpdateCartMutation } from "app/api/cartApiSlice"

const InfoBook = () => {
  const { pathname } = useLocation()
  const id = pathname.split('/').pop()
  const { id: authIndex, roles } = useAuth()
  const navigate = useNavigate()
  const { addToCart, cart } = useCart()
  const [isAlreadyInCart, setAlreadyInCart] = useState(false)
  const isAuthed = Boolean(authIndex)

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBookByIdQuery({ id })

  const [updateCart, {
    isLoading: isCartUpdateLoading,
    isSuccess: isCartUpdateSuccess
  }] = useUpdateCartMutation()


  const [deleteBook, {
    isLoading: isDeleteBookLoading,
    isSuccess: isDeleteBookSuccess,
  }] = useDeleteBookMutation()

  useEffect(() => {
    if (isAuthed) {
      updateCart({ cart, user: id })
    }
  }, [cart]);

  useEffect(() => {
    if (cart && data) {
      console.log(cart, data)
      setAlreadyInCart(cart.some(item => item._id === data._id))
    }
  }, [cart, data]);

  useEffect(() => {
    if (isDeleteBookSuccess) {
      navigate('/')
    }
  }, [isDeleteBookSuccess, navigate])

  const handleDeleteBook = async e => {
    await deleteBook({ id })
  }

  let permitedPanel
  let bookInfo
  let addBookToCart

  if (isError) {
    bookInfo = (
      <div className="book-not-found">
        <Trans>Book Not Found</Trans>
      </div>
    )
  }

  if (isLoading) bookInfo = <LoadingSpinner />
  if (isDeleteBookLoading) permitedPanel = <LoadingSpinner />
  if (isCartUpdateLoading) addBookToCart = <span className="button-loader"><LoadingSpinner /></span>

  if (isCartUpdateSuccess || !isAuthed) {
    if (isAlreadyInCart) {
      addBookToCart = <div className="book-lready-in-cart">
        <span>
          <Trans>book already in cart</Trans>
        </span>
        <Button theme="grullo" onClick={() => addToCart({ book: data })}>
          <Trans>Add more</Trans>
        </Button>
      </div>
    } else {
      addBookToCart = <Button theme="good" onClick={() => addToCart({ book: data })}>
        <Trans>Add to cart</Trans>
      </Button>
    }
  }

  if (isSuccess && data) {
    const { title, description, author, price = 0, cover, user } = data
    const isPermitted = authIndex === user || roles.includes("Admin")



    permitedPanel = isPermitted && (
      <div className="permited-actions">
        <Button theme="marengo" href={`/book/edit/${id}`}>
          <Trans>Edit Book</Trans>
        </Button>
        <Button theme="danger" onClick={handleDeleteBook}>
          <Trans>Delete Book</Trans>
        </Button>
      </div>
    )

    bookInfo = [
      <div key="book text" className="book-info-heading">
        <h1>{title}</h1>
        <p>
          <Trans>by {{ author }}</Trans>
        </p>
        <a href={`/account/${user}`}>
          <Trans>View all the books belonging to this user</Trans>
        </a>
      </div>,
      <div key="book cover" className="cover-wrapper">
        <BookCover cover={cover} />
      </div>,
      <div key="book actions" className="book-info-body">
        <div className="cta">
          <span className="cost">
            <Trans>{{ price }} UAH</Trans>
          </span>
          {
            addBookToCart
          }
        </div>
        <p className="description">{description}</p>
      </div>
    ]
  }

  return (
    <Layout title={`${data?.title} — IMBook`} description={`description: ${data?.description}`}>
      <Section className="book-info-section">
        {permitedPanel}
        {bookInfo}
      </Section>
    </Layout >
  )
}

export default InfoBook