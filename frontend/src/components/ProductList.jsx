import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';

import ProductPreview from './ProductPreview'
// import { productsReducer, reducer } from '../store/reducers';
import {  reducer } from '../store/reducers';
import Msg from './Msg';

const ProductList = () => {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true, error: '', products: []
    });

    const [productsToShow, setProductsToShow] = useState(products)

    const query = 'pants';

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>ProductList</h1>
            <div className="product-list">
                {
                    loading ? <div>LOADING...</div>
                        :
                        error ? <Msg color='pink'>{error}</Msg>
                            :
                            products?.map(product => (
                                <ProductPreview product={product} key={product.slug} />
                            ))
                }
            </div>
        </div>
    )
}

export default ProductList