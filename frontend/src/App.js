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
import FavList from './pages/FavList';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminUsers from './pages/AdminUsers';
import AdminUserEdit from './pages/AdminUserEdit';



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
            <Route path='/profile' element={<ProtectedRoutes>
              <UserProfilePage />
            </ProtectedRoutes>} /> 
            <Route path='/admin/dashboard' element={<AdminRoute>
              <AdminDashboard />
            </AdminRoute>} /> 
            <Route path='/admin/orders' element={<AdminRoute>
              <AdminOrders />
            </AdminRoute>} /> 
            <Route path='/admin/products' element={<AdminRoute>
              <AdminProducts />
            </AdminRoute>} /> 
            <Route path='/admin/product/:id' element={<AdminRoute>
              <AdminProductEdit />
            </AdminRoute>} /> 
            <Route path='/admin/users' element={<AdminRoute>
              <AdminUsers />
            </AdminRoute>} /> 
            <Route path='/admin/user/:id' element={<AdminRoute>
              <AdminUserEdit />
            </AdminRoute>} /> 
    
        
            

            
          <Route path='/shipping' element={<ShippingPage/> } />  
          <Route path='/payment' element={<PaymentPage/> } />  
          <Route path='/placeorder' element={<PlaceOrder/> } />  
          <Route path='/fav' element={<FavList/> } />  
        </Routes>
      </main>
      </div>
          </BrowserRouter>

  );
}

export default App;
