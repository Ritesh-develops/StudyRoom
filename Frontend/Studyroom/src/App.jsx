import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import AddBook from "./Pages/AddBook"
import RedirectAuthenticated from "./providers/RedirectAuthenticated"
import RedirectUnauthenticated from "./providers/RedirectUnauthenticated"
import Homepage from "./Pages/Homepage"

function App() {
  


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>, 
      children: [
        {
          path: "/",
          element: <Homepage/>
        },
        {
          path:'/login',
          element: <RedirectAuthenticated><Login/></RedirectAuthenticated>
        },
        {
          path:'/signup',
          element:<RedirectAuthenticated><Signup/></RedirectAuthenticated> 
        }, 
        {
          path: '/add-book',
          element: <RedirectUnauthenticated><AddBook/></RedirectUnauthenticated>
        }
      ]
    }
  ])

  return (
    <>
     <div>
      <RouterProvider router={router}/>
     </div>
    </>
  )
}

export default App
