import React, { useContext } from 'react'
import { Store } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    
    const updateCartQty = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.stock < quantity) {
            window.alert('no more items')
            return
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    }
    
    const removeItem =  (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
   
    }

    const handleCheckout = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <div>
            <h1>
                CartPage
            </h1>
            {
                cartItems.length < 1
                    ? (
                        <div>Cart is empty. <Link to='/'>Go Shopping</Link></div>
                    )
                    : (
                        cartItems.map((item) => (
                            <div key={item._id}>
                                <p >{item.title}---</p>
                                <p>price: ${item.price}</p>
                                <b>total: {item.price * item.quantity}</b>
                                <br />
                                <button disabled={item.quantity === item.stock}
                                    onClick={() =>updateCartQty(item, item.quantity + 1)}
                                >+</button>
                                qty:{item.quantity}
                                <button disabled={item.quantity === 1}
                                    onClick={()=>updateCartQty(item, item.quantity - 1)}
                                >-</button>
                                <br />
                                <button onClick={() => removeItem(item) }>X</button>
                                <hr />
                            </div>
                        ))
                    )
            }
            <div>
                <h3>subtotal
                    ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}Items)
                    : $ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
                <button onClick={handleCheckout}>CHECKOUT!</button>
            </div>

        </div>
    )
}

export default CartPage