interface Product {
  _id: string;
  qty: number;
  // Add other properties of your product here
}

interface CartState {
  cart: Product[];
}

interface CartAction {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "INCREASE_CART_QTY" | "DECREASE_CART_QTY" | "CLEAR_CART";
  payload?: any; // Define a more specific type if possible
}

const CartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            qty: 1,
            status: "pending",
          },
        ],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload._id),
      };
    }
    case "INCREASE_CART_QTY": {
      return {
        ...state,
        cart: state.cart.map((c) =>
          c._id === action.payload._id
            ? { ...c, qty: action.payload.qty + 1 } // Create new object for immutability
            : c
        ),
      };
    }
    case "DECREASE_CART_QTY": {
      return {
        ...state,
        cart: state.cart.map((c) =>
          c._id === action.payload._id
            ? { ...c, qty: action.payload.qty - 1 } // Create new object for immutability
            : c
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        cart: [],
      };
    }
    default:
      return state;
  }
};

export default CartReducer;