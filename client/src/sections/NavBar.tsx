import React, { useContext } from 'react'
import LogoutButton from '../components/LogoutButton'
import { AuthContext } from '../context/authContext'
import { getFullName, getNameFromJWT } from '../utils/Name'

function NavBar() {

  const { token } = useContext(AuthContext)
  const name = token ? getNameFromJWT(token) : '';
  const FullName = token ? getFullName(token) : '';

  return (
    <nav className='w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4'>
      <div className='text-lg font-semibold'>Wallet Buddy</div>
      <div className='flex items-center space-x-4'>
        <LogoutButton />
        {name && <div className='text-md rounded-full bg-white p-2 text-black' title={FullName}>{name}</div>}
      </div>
    </nav>
  )
}

export default NavBar
