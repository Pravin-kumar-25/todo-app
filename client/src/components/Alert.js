import React from 'react'

const Alert = ({type,message}) => {
  return (
    <div className="alert">
    <Alert severity={type}>{message}</Alert>
  </div>
  )
}

export default Alert