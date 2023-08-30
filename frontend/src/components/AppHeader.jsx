import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartBadgeInHeader from './CartBadgeInHeader'
import { Store } from '../store/store';

import axios from 'axios';


const AppHeader = () => {

  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  const [user, setUser] = useState({})
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if(userInfo) setUser(userInfo)
  }, [user])
  
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  return (
    <header>
      <Link to="/">AppHeader</Link>
     
      {
        userInfo
          ? (<Link to='/profile'> {user.name}</Link>)
          : (<Link to='/login'>login</Link>) 
      }

      <CartBadgeInHeader cart={cart} />
      <div>
        {categories?.map((category) => (
          <Link to={`/search?category=${category}`}>{category }</Link>
        ))}
      </div>

      <div>
        <input />
      </div>
    </header>
  )
}

export default AppHeader