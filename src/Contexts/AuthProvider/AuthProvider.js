import React, { createContext } from "react";
import useCart from "../../hooks/useCart";
import useFirebase from "../../hooks/useFirebase";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const allContexts = useFirebase();
  const [state,dispatch] = useCart([]);
  return (
    <AuthContext.Provider value={{allContexts,state,dispatch}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
 