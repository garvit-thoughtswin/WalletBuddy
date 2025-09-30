import { useContext } from 'react'
import NavBar from '../sections/NavBar'
import { AuthContext } from '../context/authContext';
import { getFullName } from '../utils/Name';
import AddExpense from '../sections/AddExpense';
import ShowExpense from '../sections/ShowExpense';

function Home() {

  const { token } = useContext(AuthContext)
  const FullName = token ? getFullName(token) : '';

  return (
    <div>
      <NavBar />
      <div>
        <h1 className='text-3xl font-bold text-center mt-10'>Hello, {FullName}!</h1>
        <AddExpense />
        <ShowExpense />
      </div>
    </div>
  )
}

export default Home
