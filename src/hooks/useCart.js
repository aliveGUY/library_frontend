import {
  selectCurrentCart,
  addToCart as addToCartStore,
  removeFromCart as removeFromCartStore,
} from "app/api/cartSlice"
import { useDispatch, useSelector } from "react-redux"

const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)

  let addToCart = async ({ book }) => {
    dispatch(addToCartStore({ book }))
  }

  let removeFromCart = async ({ id }) => {
    dispatch(removeFromCartStore({ id }))
  }

  return { addToCart, removeFromCart, cart }
}

export default useCart