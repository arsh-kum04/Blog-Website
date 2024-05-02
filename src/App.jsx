**Folder Name**: App

**File Name**: App.js

```js
// Importing React and hooks useState, useEffect
import React, { useState, useEffect } from 'react' 

// Importing useDispatch hook from react-redux
import { useDispatch } from 'react-redux'

// Importing css stylesheet
import './App.css'

// Importing authService from appwrite/auth.js
import authService from "./appwrite/auth"

// Importing login and logout actions from authSlice.js
import { login, logout } from "./store/authSlice"

// Importing Header and Footer components
import { Footer, Header } from './components'

// Importing Outlet component
import { Outlet } from 'react-router-dom'

// Defining App function as a functional component
function App() { 

  // Defining state variable loading with initial value true and setting up dispatch function
  const [loading, setLoading] = useState(true) 
  const dispatch = useDispatch()

  // Using useEffect hook to check if user is logged in
  useEffect(() => {
    // Calling getCurrentUser function from authService
    authService.getCurrentUser() 
      .then((userData) => { // Handling the promise
        if (userData) { // If user is logged in
          // Dispatching login action with user data
          dispatch(login({ userData })) 
        } else { // If user is not logged in
          // Dispatching logout action
          dispatch(logout()) 
        }
      })
      .finally(() => setLoading(false)); // Setting loading to false after promise resolves
  }, []); // Empty dependency array to run effect only once

  // Conditional rendering based on loading state
  return !loading ? ( 

      <div className='min-h-screen flex flex-wrap content-between bg-black text-white'>
        <div className='w-full block'>
          {/* Rendering Header component */}
          <Header /> 

          {/* Rendering main content */}
          <main> 
            {/* Rendering Outlet component */}
            <Outlet /> 
          </main>

          {/* Rendering Footer component */}
          <Footer /> 
        </div>
      </div>
      ) : null
}

// Exporting App component
export default App
```