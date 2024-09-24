import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from "react-toastify";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Loader from './components/common/Loader';
import './index.css'

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for user authentication state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div><Loader /></div>; // Optional loading screen while checking auth state
  }

  return (
    <div>
      {/* You can pass the authenticated user state if necessary */}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
