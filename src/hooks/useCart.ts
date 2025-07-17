import { useReducer } from 'react';
import CartReducer from '../lib/reducer/CartReducer'; // Updated path

// Define types for state and dispatch if needed, or infer from CartReducer
const useCart = () => {
  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
  });
  return [
    state, dispatch
  ] as const; // Use 'as const' for tuple type inference
};

export default useCart;