import React, { useContext, useState } from 'react'
import LogoutButton from '../components/LogoutButton'
import { AuthContext } from '../context/authContext'
import { getFullName, getNameFromJWT } from '../utils/Name'
import ToggleContainer from '../components/ToggleContainer'
import { Link } from 'react-router-dom'

function NavBar() {

  const { token } = useContext(AuthContext)
  const name = token ? getNameFromJWT(token) : '';
  const FullName = token ? getFullName(token) : '';
  const [open, setOpen] = useState(false);

  return (
    <nav className='w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4'>
      <div className='text-lg font-semibold'>Wallet Buddy</div>
      <div className='flex items-center'>
        {name && <div className='text-md rounded-full bg-white p-2 text-black cursor-pointer' title={FullName} onClick={() => { setOpen(!open) }}>{name}</div>}
        {open &&
          <ToggleContainer>
            <Link to='/profile' className='underline'>Profile</Link>
            <LogoutButton />
          </ToggleContainer>
        }
      </div>
    </nav>
  )
}

export default NavBar
