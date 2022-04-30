import React from 'react'
import LogoutButton from '../styled/LogoutButton'
import Axios from './Axios'

const Logout = ({ authFunction }) => {
    const logout =async () => {
        const response  = await Axios.get('/logout')
        console.log(response.status)
        authFunction()
    }

  return (
    <div className='logout' onClick={logout}>
        <LogoutButton title='Log out' size={'30px'}/>
    </div>
  )
}

export default Logout