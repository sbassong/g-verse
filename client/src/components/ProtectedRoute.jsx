import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { handleLogOut, user, authenticated, component: Component, ...rest } = props
  const location = useLocation()
  
  return (
    <>
      render={(props) =>
        user && authenticated 
        ? <Component user={user} authenticated={authenticated} handleLogOut={handleLogOut} {...props} /> 
        : <Navigate to="/signin" state={{ from: location }} replace />
      }
    </>
  )
}

export default ProtectedRoute
