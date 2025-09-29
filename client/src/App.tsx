import './App.css'
import Routers from './Routers'
import ContextProvider from './context/ContextProvider'

function App() {

  return (
    <>
      <ContextProvider>
        <Routers />
      </ContextProvider>
    </>
  )
}

export default App
