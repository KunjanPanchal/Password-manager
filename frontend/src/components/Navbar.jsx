import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-200 '>
            <div className='flex justify-between h-12 items-center container mx-auto'>

                <div className='logo font-bold text-xl'>
                    <span className='text-green-800'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-800'>Op</span>
                    <span className='text-green-800'>/&gt;</span>
                </div>
                <ul>
                    <a href="">
                        <img src="github-logo.png" width={40} alt="" />
                    </a>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
