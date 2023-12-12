import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      const { cart } = action.payload
      return cart
    },
    addToCart: (state, action) => {
      const { book } = action.payload;
      const updatedState = [...state, book];
      return updatedState;
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const updatedState = state.filter(item => item._id !== id);

      return updatedState;
    },
    clearCart: (state, action) => {
      return []
    }
  },
})

export const {
  addToCart,
  removeFromCart,
  setCart,
  clearCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCurrentCart = (state) => state.cart
