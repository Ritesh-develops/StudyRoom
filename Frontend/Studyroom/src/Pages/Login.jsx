import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

function Login() {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, isLoading, error} = useAuthStore();
  const navigate = useNavigate();

  const handlesubmit = async(e) => {
    e.preventDefault();

    try {
      const {message} = await login(email, password);
      toast.success(message);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <div className='min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12'>
    <h2 className='text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto'>Log In</h2>

    <form onSubmit={handlesubmit} className='flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10'>

      <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Email :</label>
          <input className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="email" name="email"  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      </div>
      <div className='flex flex-col w-full'>
          <label className='md:text-lg'>Password :</label>
          <input className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <button disabled={isLoading} className='w-full bg-[#403039] text-[#fffcf2] py-2 font-medium rounded-lg' type="submit">
          {isLoading ? 'Logging In...' : 'Log In'}
      </button>

      <p>
          Dont Have an Account? <Link to={'/Signup'}><span className='text-blue-800'>Sign up</span></Link>
      </p>
    </form>
  </div>
  )
}

export default Login
