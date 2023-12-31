import Layout from "components/Layout"
import Section from "components/Section"
import useCart from "hooks/useCart"
import BookCover from "components/BookCover"
import Button from "components/Button"
import { Trans } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useAuth from "hooks/useAuth"
import { useUpdateCartMutation } from "app/api/cartApiSlice"
import { useEffect } from "react"
import LoadingSpinner from "components/LoadingSpinner"

const Cart = () => {
  const { cart, removeFromCart } = useCart()
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
  const navigate = useNavigate()
  const { id } = useAuth()
  const isAuthed = Boolean(id)

  const [updateCart, { isLoading }] = useUpdateCartMutation()

  useEffect(() => {
    if (isAuthed) {
      updateCart({ cart, user: id })
    }
  }, [cart]);

  const list = cart.map(({ title, cover, author, _id, price }, idx) => (
    <div key={`book-${idx}`} className="list-item" >
      <div className="item-info" onClick={() => navigate(`/book/${_id}`)}>
        <div className="cover">
          <BookCover cover={cover} />
        </div>
        <div className="text">
          <h2>{title}</h2>
          <span>
            <Trans>by {{ author }}</Trans>
          </span>
        </div>
      </div>
      <div className="item-price-delete">
        <span className="price">
          <Trans>{{ price }} UAH</Trans>
        </span>
        {isLoading || !isAuthed
          ? <LoadingSpinner />
          : <Button theme="danger" onClick={() => removeFromCart({ id: _id })}>
            <Trans>Delete</Trans>
          </Button>
        }

      </div>
    </div>
  ))

  return (
    <Layout>
      <Section className="cart-section">
        <h1>
          <Trans>Cart</Trans>
        </h1>
        <div className="books-list">
          {
            cart.length > 0
              ? list
              : <span className="empty-car-message">
                <Trans>Cart is empty</Trans>
              </span>
          }
        </div>
        <div className="total-price">
          <div>
            <Trans>Total price: <span className="price">{{ totalPrice }} UAH</span></Trans>
          </div>
          <Button theme="good">
            <Trans>Proceed to Purchase</Trans>
          </Button>
        </div>
      </Section>
    </Layout>
  )
}

export default Cart