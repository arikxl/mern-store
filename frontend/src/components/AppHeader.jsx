import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartBadgeInHeader from './CartBadgeInHeader'
import { Store } from '../store/store';

const AppHeader = () => {

  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  const [user, setUser] = useState({})

  useEffect(() => {
    if(userInfo) setUser(userInfo)
  },[user, userInfo])

  return (
    <header>
      <Link to="/">AppHeader</Link>
     
      {
        userInfo
          ? (<Link to='/profile'> {userInfo.name}</Link>)
          : (<Link to='/login'>login</Link>) 
      }

      <CartBadgeInHeader cart={cart} />
    </header>
  )
}

export default AppHeader