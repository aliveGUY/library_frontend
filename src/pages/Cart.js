import Layout from "components/Layout"
import Section from "components/Section"
import useCart from "hooks/useCart"
import BookCover from "components/BookCover"
import Button from "components/Button"
import { Trans } from "react-i18next"

const Cart = () => {
  const { cart, removeFromCart } = useCart()

  return (
    <Layout>
      <Section className="cart-section">
        <h1>
          <Trans>Cart</Trans>
        </h1>
        <div className="books-list">
          {cart.map(({ title, cover, author, id, _id, price }, idx) => (
            <div key={`book-${idx}`} className="list-item">
              <div className="item-info">
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
                <Button theme="danger" onClick={() => removeFromCart({ id: _id })}>
                  <Trans>Delete</Trans>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  )
}

export default Cart