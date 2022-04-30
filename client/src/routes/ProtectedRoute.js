import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ auth,Component }) => {
  return (
    <Route 
        render= {()=> auth ? (
            <Component />
        ) : (
            <Redirect to="/login" />
        )}
    
    />
  )
}

export default ProtectedRoute