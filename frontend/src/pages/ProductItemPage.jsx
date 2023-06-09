import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { productsItemReducer } from '../store/reducer';
import axios from 'axios';

const ProductItemPage = () => {

  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(productsItemReducer, {
    loading: true, error: '', product: {}
  });

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }
    }
    fetchProduct()
  }, [slug])

  return (
    loading ? <div>LOADING...</div>
      :
      error ? <div>{error}</div>
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
                <button>Add to Cart</button>
              </>
            }
          </div>
        </div>
  )
}

export default ProductItemPage