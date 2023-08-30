import React, { useContext, useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Store } from '../store/store';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();


  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart: { paymentMethod, shippingAddress } } = state;
  
  
  const [paymentMethodNAme, setPaymentMethod] = useState(paymentMethod || 'cash')
  
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  },[shippingAddress, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodNAme })
    localStorage.setItem('linoy-paymentMethod', paymentMethodNAme);
    navigate('/placeorder')
  }

  return (
      <div>
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment</h1>
          <form onSubmit={handleSubmit}>
          <input type="radio" id="cash" value='cash'
            checked={paymentMethodNAme === 'cash'} onChange={(e) => { setPaymentMethod(e.target.value)}} />
          <label > Cash</label>
          <br/>
          <input type="radio" id="paypal" value='paypal'
            checked={paymentMethodNAme === 'paypal'}  onChange={(e) => { setPaymentMethod(e.target.value)}} />
          <label> PayPal (soon)</label>
          <br/>
          <input type="radio" id="creditCard" value='creditCard'
          checked={paymentMethodNAme === 'creditCard'}  onChange={(e) => { setPaymentMethod(e.target.value)}} />
          <label> Credit Card (soon)</label>
          <br />
          <button type="submit">Continue</button>
          </form>
      </div>
  )
}

export default PaymentPage