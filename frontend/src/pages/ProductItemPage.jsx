import React, { useContext, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { productsItemReducer } from '../store/reducers';
import axios from 'axios';
import Msg from '../components/Msg';
import { getError } from '../utils/util';
import { Store } from '../store/store';


const ProductItemPage = () => {

  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(productsItemReducer, {
    loading: true, error: '', product: {}
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchProduct()
  }, [slug])

  const handleAddToCart = () => {
    ctxDispatch({type: 'CART_ADD_ITEM', payload:{...product, quantity:1}})
  }

  return (
    loading ? <div>LOADING...</div>
      :
      error ? <Msg>{error}</Msg>
        :
        <div className="product-item">
          <img src={product.img1} alt={product.title} />
          <div>
            <h1> {product.title}</h1>
            <hr />
            <h3>${product.price}</h3>
            <hr />
            <h5>reviews:{product.rating}({product.numOfReviews})</h5>
            <hr />
            <p>description</p>
            <p>{product.desc}</p>
          </div>
          <div>
            {product.stock < 1 ?
              <mark>NOT IN STOCK</mark>
              :
              <>
                <h2>total price: {product.price}</h2>
                <h4>amount: 1</h4>
                <button onClick={handleAddToCart}>Add to Cart</button>
              </>
            }
          </div>
        </div>
  )
}

export default ProductItemPage