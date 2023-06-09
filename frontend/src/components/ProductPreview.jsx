import React from 'react'
import { Link } from 'react-router-dom'

const ProductPreview = ({ product }) => {
    return (
        <div className="product-preview">
            <Link to={`/product/${product.slug}`}>
                <img src={product.img1} alt={product.title} />
            </Link>
            <p>{product.title}</p>
            <p>${product.price}</p>
            <button>Add 2 cart</button>
        </div>
    )
}

export default ProductPreview