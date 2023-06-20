import React from 'react'
import { Link } from 'react-router-dom'

const CartBadgeInHeader = ({ cart }) => {

    return (
        <Link to='/cart'>
            <mark>Cart: {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</mark>
        </Link>
    )
}

export default CartBadgeInHeader