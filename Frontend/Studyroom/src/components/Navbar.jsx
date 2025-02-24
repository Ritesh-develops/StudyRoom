import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const {user, logout } = useAuthStore();

  console.log("user : ", user)

  const hanldelogout = async() => {
   const {message} = await logout();
   toast.success(message);

  }

  return (
    <nav className='bg-[#252422] flex justify-between items-center text-[#fffcf2] px-4 md:px-12 py-4 md:py-6'>
     <Link to="/">
     <label className='font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer'>StudyRoom</label>
     </Link>

     {user ? 
     (<div className='flex items-center space-x-5 md:text-lg'>
        <Link to={'/add-book'}><p className='bg-[#403d39] px-3 py-2'>Add Book</p></Link>
        <p className='cursor-pointer' onClick={hanldelogout}>Logout ({user.username})</p>

      </div>)  : (<div className='flex items-center space-x-5 md:text-lg'>
        <Link to={'/Login'}><p>Add Book</p></Link>
        <Link to={'/Login'}><p>Log In</p></Link>
        <Link to={'/Signup'}><p className='bg-[#403d39] px-3 py-2'>Sign Up</p></Link>
      </div>) }

      
    </nav>
  )
}

export default Navbar


