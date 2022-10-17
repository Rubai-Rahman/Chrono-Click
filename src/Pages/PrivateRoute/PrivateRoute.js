import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const PrivateRoute = ({ children, ...rest }) => {
  let location = useLocation()
  const {
    allContexts: { user },
  } = useAuth()
  if (user.email) {
    return children
  }
  return <Navigate to="/login" state={{ from: location }} />
}

export default PrivateRoute
