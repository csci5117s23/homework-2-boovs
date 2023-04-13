// Imports
import '../styles/globals.css'
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Link from 'next/link';
import Card from '@mui/material/Card';

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


// CLERK Publishable Key
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= "pk_test_ZmxleGlibGUtbWFuYXRlZS0xLmNsZXJrLmFjY291bnRzLmRldiQ";

////////////////////////////////////////////////////
// Default "App" export function
////////////////////////////////////////////////////
function MyApp({ Component, pageProps }: AppProps) {

  /////////////////////////////////////////////////////////////////////
  // RETURN JSX
  /////////////////////////////////////////////////////////////////////
  return (
    <ClerkProvider {...pageProps} publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      {/* User logged in */}
      <SignedIn>  
        <Card sx={{ backgroundColor: 'grey', textAlign: 'center'}}>
          <Link href="/todos">Go back home.</Link>
        </Card>
        <Component {...pageProps} />
      </SignedIn>

      {/* User not logged in */}
      <SignedOut>
          <SignInPage/>
      </SignedOut>

    </ClerkProvider>
  );
}

export default MyApp;