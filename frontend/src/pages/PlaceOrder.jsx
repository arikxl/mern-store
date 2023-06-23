import React, { useContext, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Store } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
  const navigate = useNavigate();


  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )

  cart.shippingPrice = cart.itemsPrice > 200 ? round2(0) : round2(30);
  cart.taxPrice = round2((cart.itemsPrice + cart.shippingPrice) * 0.17)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, navigate])

  const handlePlaceOrder = async () => {

  }


  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <h1>Preview order</h1>
      <div className="flex">
        <div style={{ flex: '5' }}>
          <div>
            <h2>shipping</h2>
            <p>{cart.shippingAddress.fullName}</p>
            <p>{cart.shippingAddress.address} ,{cart.shippingAddress.city}</p>
            <p>{cart.shippingAddress.zipcode}</p>
            <p><Link to='/shipping'>EDIT</Link></p>
          </div>
          <hr />
          <div>
            <h2>Payment method</h2>
            <p>{cart.paymentMethod}</p>
            <p><Link to='/payment'>EDIT</Link></p>
          </div>
          <hr />
          <div>
            <h2>CART ITEMS</h2>

            {
              cart.cartItems.map((item) => (
                <div key={item._id} className="flex center">
                  <img className="sml-img" src={item.img1} alt={item.title} />
                  ||<Link to={`/product/${item.slug}`}> {item.title}  </Link>
                  <p> || qty: {item.quantity}</p>
                  <p> || $ {item.price}</p>
                  <p> ||total:  $ {item.price * item.quantity}</p>
                </div>
              ))
            }
            <p><Link to='/cart'>EDIT</Link></p>
          </div>
          <hr />




        </div>
        <div style={{ flex: '2' }} className='col'>
          <h2>order summery</h2>
          <p> || items: ${cart.itemsPrice?.toFixed(2)}</p>
          <p> || shipping: ${cart.shippingPrice?.toFixed(2)}</p>
          <p> || tax: ${cart.taxPrice?.toFixed(2)}</p>
          <p><mark>|| total: ${cart.totalPrice?.toFixed(2)}</mark> </p>
          <button disabled={cart.cartItems.length < 1} onClick={handlePlaceOrder}>Place order</button>

        </div>
      </div>


    </div>
  )
}

export default PlaceOrder