// Imports
import '../styles/globals.css'
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Link from 'next/link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Card';
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
function MyApp({ Component, pageProps }: AppProps) {
    
  /////////////////////////////////////////////////////////////////////
  // RETURN JSX
  /////////////////////////////////////////////////////////////////////
  return (
    <ClerkProvider {...pageProps} publishableKey={NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      {/* User logged in */}
      <SignedIn>  
        <Container sx={{ display: 'flex', justifyContent: 'center', height: '6vh', margin: 1, backgroundColor: "#283593"}}>
          <Link href="/todos"> 
            <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'center', height: '80%', margin: 1, backgroundColor: "black"}}>
              Go back to main To-do list. 
            </Button>
          </Link>
        </Container>
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