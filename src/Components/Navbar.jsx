import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-slate-600 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>
                iTask
            </span>
        </div>
        <ul className='flex gap-7 mx-12'>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</li>
        </ul>
      
    </nav>
  )
}

export default Navbar
