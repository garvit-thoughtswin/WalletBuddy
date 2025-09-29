import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Button from './Button'

function LogoutButton() {
  const { handleLogout } = useAuth()
  

  return (
    <Button onclick={handleLogout} value='Logout' disabled={false} className='cursor-pointer p-1'/>
  )
}

export default LogoutButton
