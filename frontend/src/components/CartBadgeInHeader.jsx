import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../store/store';

const CartBadgeInHeader = () => {

    const { state } = useContext(Store);
    const { cart } = state;
    return (
        <Link to='/cart'>
            <mark>Cart: { cart.cartItems.length }</mark>
        </Link>
    )
}

export default CartBadgeInHeader