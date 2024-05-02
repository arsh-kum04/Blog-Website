**Folder Name**: src
**File Name**: Protected.jsx
**Documented Code**:
```jsx
import React, { useState, useEffect } from 'react'; // importing necessary hooks from react library
import { useSelector } from 'react-redux'; // importing useSelector from 'react-redux'
import { useNavigate } from 'react-router-dom'; // importing useNavigate from react-router-dom

// Functional component that takes children and authentication props
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate(); // create a variable to hold the useNavigate function
    const [loader, setLoader] = useState(true); // create a state variable called loader and initialize it to true

    const authStatus = useSelector(state => state.auth.status); // get auth status from redux state using useSelector

    // useEffect is a hook that is called after every render
    useEffect(() => {

        // check if authentication prop is true and authStatus is not the same as authentication
        if (authentication && authStatus !== authentication) {
            navigate('/login'); // redirect to login page
        }
        // else if authentication prop is false and authStatus is not the same as authentication
        else if (!authentication && authStatus !== authentication) {
            navigate('/'); // redirect to root page
        }
        // after checking, set loader to false
        setLoader(false);

    }, [authStatus, navigate, authentication]); // dependencies array for useEffect

    // if loader is true (means loading), return "Loading..."
    return loader ? <div>Loading...</div> : <>{children}</> // if loader is false, return children
}
```