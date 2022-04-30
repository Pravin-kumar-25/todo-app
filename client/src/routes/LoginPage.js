import React, {useState, useEffect} from 'react'
import PrimaryButton from '../styled/PrimaryButton';
import { Button } from '@mui/material';
import PageTitle from '../styled/PageTitle';
import BasicForm from '../styled/BasicForm';
import InputField from '../styled/InputField';
import { Link } from 'react-router-dom';
import GoogleButton from '../components/GoogleButton';
import Axios from '../components/Axios'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';


const LoginPage = () => {
  const navigate = useNavigate()
  const [errorMessage,setErrorMessage] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [disable,setDisable] = useState(true)
  const [alert,setAlert] = useState(false)

  useEffect(() => {
    setTimeout(()=> {
      if(alert) {
        setAlert(false)
      }
    },5000)
  }, [alert])
  
  useEffect(() => {
    if(email !== '' && password !== '') {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [email,password])
  

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    Axios.post('/login',{
      username:email,
      password:password
    }).then((res)=> {
      console.log(res.status)
      if(res.status === 200) {
        navigate('/')
      }
    }).catch((err)=> {
      if(err.response.status === 401) {
        setErrorMessage('Invalid Password')
        setAlert(true)
      }
    })

  }

  return (
    <div className='login'>
            {alert ? <ErrorMessage message={errorMessage} /> : null}
      <form onSubmit={onSubmit}>
        <BasicForm
        >
          <PageTitle>Login</PageTitle>
          <div className='input-section' style={{ height:"150px"}}>
            <div>
              <InputField id="email" label="Email" variant="outlined" type={'email'} required onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
              <InputField id="password" label="Password" variant="outlined" type={'password'} required onChange={(e)=> setPassword(e.target.value)}/>
            </div>
          </div>
          <div className='buttons'>
              <Link to='/register'>
            <Button variant='outlined' sx={{ position: "relative", right: "10px",height:"50px" }}>
              Sign Up
            </Button>
              </Link>
            <PrimaryButton variant='contained' type='submit' disabled={disable}>
              Login
            </PrimaryButton>
          </div>
          <hr></hr>
          <GoogleButton />
        </BasicForm>
      </form>
    </div>
  )
}

export default LoginPage