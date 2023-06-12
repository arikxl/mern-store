import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';

import ProductPreview from './ProductPreview'
import { productsReducer } from '../store/reducer';
import Msg from './Msg';

const ProductList = () => {

    const [{ loading, error, products }, dispatch] = useReducer(productsReducer, {
        loading: true, error: '', products: []
    });

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
                        error ? <Msg>{error}</Msg>
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