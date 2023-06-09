import React from 'react'
import data from '../data/data'
import ProductPreview from './ProductPreview'

const ProductList = () => {
    return (
        <div>
            <h1>ProductList</h1>
            <div className="product-list">

                {
                    data.products.map(product => (
                        <ProductPreview product={product} key={product.slug} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList