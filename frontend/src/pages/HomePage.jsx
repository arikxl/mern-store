import React, { useContext } from 'react'
import ProductList from '../components/ProductList'
import { Store } from '../store/store';
import { Link } from 'react-router-dom';

const HomePage = () => {

  const { state } = useContext(Store);
  const { favItems } = state;

  return (
    <div>
      <Link to='fav'>
        <h1>fav list: {favItems?.length }</h1>
      </Link>
          <ProductList/>
    </div>
  )
}

export default HomePage