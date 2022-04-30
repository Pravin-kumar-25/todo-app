import React, { useState, useEffect } from 'react'
import PrimaryButton from '../styled/PrimaryButton';
import { Button } from '@mui/material';
import PageTitle from '../styled/PageTitle';
import BasicForm from '../styled/BasicForm';
import InputField from '../styled/InputField';
import { Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import Axios from '../components/Axios'
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [alert,setAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(alert) {
            setTimeout(()=> {
                setAlert(false)
            },5000)
        }
    }, [alert])

    const onSubmit = (e) => {
        e.preventDefault()
        if(e.target[2].value !== e.target[4].value) {
            setAlert(true)
            setErrorMessage('Password does not match - Please try again')
        } else {

            Axios.post('/register',{
                username:e.target[0].value,
                password:e.target[2].value
            })
            .then((res)=> {
                if(res.status === 201) {
                    navigate('/')
                }
            }).catch((error) => {
                console.log(error.response.status)
                if(error.response.status === 409) {
                    setErrorMessage('User Already Exist - Try Loging In')
                    setAlert(true)
                }
            })
        }
    }

    return (
        <div style={{position:'relative'}} className='register'>
            {alert ? <ErrorMessage message={errorMessage} /> : null}
            <form onSubmit={onSubmit}>
                <BasicForm
                >
                    <PageTitle>Sign Up</PageTitle>
                    <div className='input-section' style={{ height: "250px" }}>
                        <div>
                            <InputField id="email" label="Email" variant="outlined" type={'email'} required/>
                        </div>
                        <div>
                            <InputField id="password" label="Password" variant="outlined" type={'password'} required />
                        </div>
                        <div>
                            <InputField id="confirm-password" label="Confirm Password" variant="outlined" type={'password'} required />
                        </div>
                    </div>
                    <div className='buttons'>
                        <Link to='/login'>
                            <Button variant='outlined' sx={{ position: "relative", right: "10px", height: "50px" }}>
                                Login
                            </Button>
                        </Link>
                        <PrimaryButton variant='contained' type='submit'>Sign Up</PrimaryButton>
                    </div>
                    <hr></hr>
                    <GoogleButton />
                </BasicForm>
            </form>
        </div>
    )
}

export default RegisterPage