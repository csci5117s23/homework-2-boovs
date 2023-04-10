// Imports
import '../styles/globals.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AppProps } from 'next/app'
import { redirect } from 'next/navigation';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Component Imports
import SignInPage from './SignInPage'
import TodosPage from './todos'

// Clerk Authorization Imports
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut,
  SignIn,
  UserButton,
  RedirectToSignIn,
  useUser,
  useAuth,
} from '@clerk/nextjs';

// CLERK Publishable Key
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "pk_test_ZmxleGlibGUtbWFuYXRlZS0xLmNsZXJrLmFjY291bnRzLmRldiQ";

// React backend API endpoint and API token
const API_ENDPOINT            = "https://todobackend-fm9y.api.codehooks.io/dev";
const API_ENDPOINT_VISITORS   = API_ENDPOINT + "/visitors";
const API_ENDPOINT_USERS      = API_ENDPOINT + "/users";

const API_KEY_RW = "3b7c5db3-2f5c-4ed0-a2cb-da5a79ef809e";
const API_KEY_R = "2b2e8993-944c-491d-9081-ec3f2412fe50";


// Get email from clerk authorization
function Test()
{
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // console.log(userId);
}


// Get email from clerk authorization
const Email = () => {
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn, user } = useUser()
  // Ensure user is both logged AND signed in.
  if (!isLoaded || !isSignedIn) {
    return null
  }
  Test();
  return (
    <>
      {user.primaryEmailAddress?.toString()}
    </>  
  )
}


////////////////////////////////////////////////////
// Default "App" export function
////////////////////////////////////////////////////
function MyApp({ Component, pageProps }: AppProps) {

  // Application state variables
  const [visits, setVisits] = useState(null);
  const [message, setMessage] = useState(null); 

  // ----------------------------------------------------------
  // Get number of site visits
  useEffect(()=>{
    // Call Codehooks backend API
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT_VISITORS, {
        method: "GET",
        headers: { "x-apikey": API_KEY_R }
      });
      const data = await response.json();
      // Change application state and reload
      setMessage(data.message);
      setVisits(data.visits);
    }
    fetchData();
  },[]);
  // ----------------------------------------------------------


  /////////////////////////////////////////////////////////////////////
  // RETURN JSX
  /////////////////////////////////////////////////////////////////////
  return (
    <ClerkProvider {...pageProps} publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      {/* User logged in */}
      <SignedIn>  
        <UserButton/>
        <Component {...pageProps} />
        <Email/>{visits}
      </SignedIn>

      {/* User not logged in */}
      <SignedOut>
          <SignInPage/>
      </SignedOut>

    </ClerkProvider>
  );
}

export default MyApp;