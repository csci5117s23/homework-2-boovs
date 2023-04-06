//////////////////////////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////////////////////////
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from 'react';

// Mui imports
import Button from '@mui/material/Button';
import TodoList from './todos';

//////////////////////////////////////////////////////////////////////////
// React backend API endpoint and API token
const API_ENDPOINT = 'https://example-iv05.api.codehooks.io/dev';
const API_KEY = '3c4fa4d4-cabb-4b79-ba3e-7c4990cc547a';
//////////////////////////////////////////////////////////////////////////

export default function Home() {
  
  // -----------------------
  // Application state hooks
  // -----------------------
  const [visits, setVisits] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    // Call Codehooks backend API
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        method: "GET",
        headers: { "x-apikey": API_KEY }
      });
      const data = await response.json();
      // Change application state and reload
      setMessage(data.message);
      setVisits(data.visits);
    }
    fetchData();
  },[])


  // -----------------------
  // Return statement
  // -----------------------
  return (
    <>
      <main>
        <TodoList></TodoList>
      </main>
    </>
  );
  // return (
  //   <div className="App">
  //       <header className="App-header">
  //         <h2>
  //           React backend with Codehooks.io
  //         </h2>
  //         <h2 style={{height: '50px'}} className="heading">
  //           {message || ''}
  //         </h2> 
  //         <p>
  //           Visitors: {visits || '---'}
  //         </p>          
  //       </header>
  //     </div>
  // );
}
