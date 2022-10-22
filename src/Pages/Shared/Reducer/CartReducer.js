import React from "react"

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            qty: 1,
          },
        ],
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload._id),
      }
    }
    case "INCREASE_CART_QTY": {
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c._id === action.payload._id
            ? (c.qty = action.payload.qty + 1)
            : c.qty
        ),
      }
    }
    case "DECREASE_CART_QTY": {
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c._id === action.payload._id
            ? (c.qty = action.payload.qty - 1)
            : c.qty
        ),
      }
    }
    case "ClEAR_CART": {
      return {
        cart: [],
      }
    }
    default:
      return state
  }
}

export default CartReducer
