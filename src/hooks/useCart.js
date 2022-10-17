
import { useReducer } from 'react';
import CartReducer from '../Pages/Shared/Reducer/CartReducer';

const useCart = () => {
  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
  });
  return [
    state, dispatch
  ];
};

export default useCart;