import React from 'react'
import { Link } from 'react-router-dom'
import CartBadgeInHeader from './CartBadgeInHeader'

const AppHeader = () => {
  return (
    <header>
      <Link to="/">AppHeader</Link>
      <Link to='login'>login</Link>
      <CartBadgeInHeader />
    </header>
  )
}

export default AppHeader