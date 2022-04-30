import React from 'react'
import Alert from '@mui/material/Alert';

const ErrorMessage = ({ message }) => {
  return (
    <div className='error-message'>
        <Alert severity="error">{message}</Alert>
    </div>
  )
}

export default ErrorMessage
