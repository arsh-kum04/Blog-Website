**Folder Name**: src
**File Name**: Protected.jsx
**Documented Code**:
```jsx
// importing necessary hooks from react library
import React, { useState, useEffect } from 'react';
// importing useSelector from 'react-redux'
import { useSelector } from 'react-redux';
// importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

// Functional component that takes children and authentication props
export default function Protected({ children, authentication = true }) {
    // create a variable to hold the useNavigate function
    const navigate = useNavigate();
    // create a state variable called loader and initialize it to true
    const [loader, setLoader] = useState(true);

    // get auth status from redux state using useSelector
    const authStatus = useSelector(state => state.auth.status);

    // useEffect is a hook that is called after every render
    useEffect(() => {
        // check if authentication prop is true and authStatus is not the same as authentication
        if (authentication && authStatus !== authentication) {
            // redirect to login page
            navigate('/login');
        }
        // else if authentication prop is false and authStatus is not the same as authentication
        else if (!authentication && authStatus !== authentication) {
            // redirect to root page
            navigate('/');
        }
        // after checking, set loader to false
        setLoader(false);
    }, [authStatus, navigate, authentication]); // dependencies array for useEffect

    // if loader is true (means loading), return "Loading..."
    return loader ? <div>Loading...</div> : <>{children}</> // if loader is false, return children
}
```