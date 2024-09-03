import {onAuthStateChanged} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {auth} from '../Firebase/config';

export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      console.log('got user : ' , user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);
  return {user};
}
