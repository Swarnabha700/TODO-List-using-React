import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-950 text-white py-3'>
        <div className="logo mx-8 cursor-pointer">
            <span className='font-bold text-xl'>iTodo</span>
        </div>
        <ul className='flex gap-8 mx-8'>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
