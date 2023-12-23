"use client"

import React from 'react';
import {  useSession } from 'next-auth/react';
import { authOptions } from '@/utils/auth';

const Welcome = () => {
  // If using getServerSession, session is already provided as a prop
  const {data: session, status} = useSession();
console.log(session)
console.log(sessionStorage)

if (status === "authenticated") {

  return (
    
    <div>
    Welcome

      
      
    <p style={{ color: 'white' }}> {session?.user?.email}</p>
    <p style={{ color: 'white' }}> {session?.user?.name}</p>
    <p style={{ color: 'white' }}> Your role is: {session?.user?.role}</p>
    </div>
  
  );
};
}


export default Welcome;
