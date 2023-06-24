import AppHeader from './components/AppHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import SignInPage from './pages/SignInPage';
import ProductItemPage from './pages/ProductItemPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrder from './pages/PlaceOrder';
import OrderPage from './pages/OrderPage';



function App() {


  return (
    <BrowserRouter>

    <div className="App">
      <ToastContainer position='bottom-center' limit={ 1} />
      <AppHeader  />
      <main>
        <Routes>
          <Route path='/' element={<HomePage/> } />  
          <Route path='/product/:slug' element={<ProductItemPage/> } />  
          <Route path='/order/:id' element={<OrderPage/> } />  
          <Route path='/cart' element={<CartPage/> } />  
          <Route path='/login' element={<SignInPage/> } />  
          <Route path='/register' element={<Register/> } />  
          <Route path='/profile' element={<UserProfilePage/> } />  
          <Route path='/shipping' element={<ShippingPage/> } />  
          <Route path='/payment' element={<PaymentPage/> } />  
          <Route path='/placeorder' element={<PlaceOrder/> } />  
        </Routes>
      </main>
      </div>
          </BrowserRouter>

  );
}

export default App;
