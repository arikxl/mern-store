import AppHeader from './components/AppHeader';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductItemPage from './pages/ProductItemPage';
import CartPage from './pages/CartPage';


function App() {


  return (
    <div className="App">
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<HomePage/> } />  
          <Route path='/product/:slug' element={<ProductItemPage/> } />  
          <Route path='/cart' element={<CartPage/> } />  
        </Routes>
      </main>
    </div>
  );
}

export default App;
