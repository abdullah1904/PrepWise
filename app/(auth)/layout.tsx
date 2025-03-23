import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {
  const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated) {
      redirect('/');
    }
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default AuthLayout