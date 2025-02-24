import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [confirmpassword, setConfirmPassword] = useState('');

    const {signup, isLoading, error} = useAuthStore();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if(password !== confirmpassword) {
                // toast notification
                toast.error('Passwords do not match');
                return;
            }

            await signup(username, email, password);
            navigate('/')
        } catch (error) {
           console.log(error); 
        }
    }

  return (
    <div className='min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12'>
      <h2 className='text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto'>Sign up</h2>

      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10'>
        <div className='flex flex-col w-full'>
            <label className='md:text-lg'>Username :</label>
            <input className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="text" name="username" value={username}
            onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className='flex flex-col w-full'>
            <label className='md:text-lg'>Email :</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
             className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="email" name="email" />
        </div>
        <div className='flex flex-col w-full'>
            <label className='md:text-lg'>Password :</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="password" name="password" />
        </div>
        <div className='flex flex-col w-full'>
            <label className='md:text-lg'>Confirm Password :</label>
            <input value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}
             className='w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' type="password" name="confirmpassword" />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button disabled={isLoading} className='w-full bg-[#403039] text-[#fffcf2] py-2 font-medium rounded-lg' type="submit">
        {isLoading ? 'Loading...' : 'Sign Up'}
        </button>

        <p>
            Already Have an Account? <Link to={'/Login'}><span className='text-blue-800'>Login Here</span></Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
