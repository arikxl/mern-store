import React, { useContext } from 'react'
import { Store } from '../store/store';

const FavList = () => {


    const { state } = useContext(Store);
    const { favItems } = state;


  return (
      <div>FavList: {favItems.length}</div>
  )
}

export default FavList