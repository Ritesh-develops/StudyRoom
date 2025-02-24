import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'

function Layout() {

  const {fetchUser, fetchingUser} = useAuthStore();

  useEffect(()=>{
    fetchUser();
  }, [fetchUser])

  if(fetchingUser){
    return <div>Loading...</div>
  }

  return (
    <div>
        <Toaster/>
        <div>
           <Navbar/>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
    
  )
}

export default Layout
