import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-[#1571b2] flex justify-between py-3 px-10">
        <div className="logo">
            <span className="font-bold text-xl cursor-pointer text-gray-50 hover:text-gray-200">smartTask</span>
        </div>
        <div className='flex space-x-4'>
            <li className='list-none font-medium cursor-pointer text-slate-200 hover:text-slate-50'>Home</li>
            <li className='list-none font-medium cursor-pointer text-slate-200 hover:text-slate-50'>Tasks</li>
        </div>
    </nav>
  )
}

export default Navbar
