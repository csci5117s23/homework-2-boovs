// Imports
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'


// Component Imports
import SignInPage from '../components/SignInPage'

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
import { Button } from '@mui/material';


// CLERK Publishable Key
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "pk_test_ZmxleGlibGUtbWFuYXRlZS0xLmNsZXJrLmFjY291bnRzLmRldiQ";

////////////////////////////////////////////////////
// Default "App" export function
////////////////////////////////////////////////////
function Home({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // Redirect to todos if a user is logged in 
  if (isSignedIn) {
    router.push("/todos");
  } else {
    router.push("/");
  }

}

export default Home;