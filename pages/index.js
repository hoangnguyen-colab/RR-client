import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '@contexts/UserContext';
import Login from '@components/Login';
import Chat from '@components/Chat';
import { useRouter } from 'next/router';
import withAuth from '@hocs/withAuth';

function Home() {
  const router = useRouter()
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.id) {
      router.push('/login');
    }
  }, [])

  return (
    <div>
      {user.id && <Chat />}
    </div >

  )
}

export default withAuth(Home);
