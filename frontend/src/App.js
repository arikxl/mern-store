import AppHeader from './components/AppHeader';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductItemPage from './pages/ProductItemPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import Register from './pages/Register';
import UserProfilePage from './pages/UserProfilePage';



function App() {


  return (
    <div className="App">
      <AppHeader  />
      <main>
        <Routes>
          <Route path='/' element={<HomePage/> } />  
          <Route path='/product/:slug' element={<ProductItemPage/> } />  
          <Route path='/cart' element={<CartPage/> } />  
          <Route path='/login' element={<SignInPage/> } />  
          <Route path='/register' element={<Register/> } />  
          <Route path='/profile' element={<UserProfilePage/> } />  
        </Routes>
      </main>
    </div>
  );
}

export default App;
