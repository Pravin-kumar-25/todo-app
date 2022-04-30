import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

const GoogleButton = () => {
    return (
        <div className='google'>
                    <a href='http://localhost:4000/auth/google'> 
            <Button variant='contained'>
                <div className='google-icon'>
                    <GoogleIcon sx={{ color: "red" }} />
                </div>
                Sign In With Google</Button>
                    </a>
        </div>
    )
}

export default GoogleButton