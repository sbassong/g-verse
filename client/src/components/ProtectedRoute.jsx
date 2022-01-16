import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { handleLogOut, user, authenticated, component: Component, ...rest } = props
  
  return (
    <Route
      {...rest}
      render={(props) =>
        user && authenticated ? <Component user={user} authenticated={authenticated} handleLogOut={handleLogOut} {...props} /> : <Redirect to="/signin" />
      }
    />
  )
}

export default ProtectedRoute
