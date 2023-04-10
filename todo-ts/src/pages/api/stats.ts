import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  
  // Unauthorized users
  if ( !userId ) 
  {
    res.status(401).json({
      status: 'Unauthorized'
    })
    return;
  }

  // Load any data your application needs for the API route
  
  return res.status(200).json({
    favorites: 15,
    name: "dog",
  })
};