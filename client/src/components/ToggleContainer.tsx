import React from 'react'

function ToggleContainer({children}: {children: React.ReactNode}) {
  return (
    <div className='absolute top-16 right-4 bg-white text-black rounded shadow-lg px-4 py-8 flex flex-col space-y-2 '>
      {children}
    </div>
  )
}

export default ToggleContainer
