import { useContext } from 'react'
import './App.css'
import Routers from './Routers'
import { AuthContext } from './context/authContext'
import NavBar from './sections/NavBar'

function App() {
  const { token } = useContext(AuthContext)

  return (
    <>
        {token &&<NavBar />}
        <Routers />
    </>
  )
}

export default App
