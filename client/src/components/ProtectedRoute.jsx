import React, { useContext } from "react";
import { Navigate, Route, useLocation } from 'react-router-dom'
import { UserContext } from "../utils";


const ProtectedRoute = ({ handleLogOut, authenticated, component: Component }) => {
  const authenticatedUser = useContext(UserContext);
  const location = useLocation()
  
  return (
    <>
      render=
      {(props) =>
        authenticatedUser?.isAuthenticated ? (
          <Component
            user={authenticatedUser}
            authenticated={authenticated}
            handleLogOut={handleLogOut}
            {...props}
          />
        ) : (
          <Navigate to="/signin" state={{ from: location }} replace />
        )
      }
    </>
  );
}

export default ProtectedRoute
