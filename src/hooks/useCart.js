import {
  selectCurrentCart,
  addToCart as addToCartStore,
  removeFromCart as removeFromCartStore,
} from "app/api/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateCartMutation } from "app/api/cartApiSlice"
import { useEffect } from "react"
import useAuth from "./useAuth"

const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCurrentCart)
  const [updateCart, {
    isLoading,
    isSuccess
  }] = useUpdateCartMutation()
  const { id } = useAuth()
  const isAuthed = Boolean(id)

  let addToCart = async ({ book }) => {
    dispatch(addToCartStore({ book }))
  }

  let removeFromCart = async ({ id }) => {
    dispatch(removeFromCartStore({ id }))
  }

  useEffect(() => {
    if (isAuthed) {
      updateCart({ cart, user: id })
    }
  }, [cart]);

  return { addToCart, removeFromCart, cart, isLoading, isSuccess }
}

export default useCart