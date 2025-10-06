import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { getFullName } from '../utils/Name';
import AddExpense from '../sections/AddExpense';
import ShowExpense from '../sections/ShowExpense';
import Button from '../components/Button';

function Home() {

  const { token } = useContext(AuthContext)
  const FullName = token ? getFullName(token) : '';
  const [openAddExpense,setOpenAddExpense] = useState(false)

  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold text-center mt-10'>Hello, {FullName}!</h1>
        <Button type='button' value='Add Expense' onclick={()=>{setOpenAddExpense(!openAddExpense)}}/>
        {openAddExpense && <AddExpense />}
        <ShowExpense />
      </div>
    </div>
  )
}

export default Home
