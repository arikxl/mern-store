import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../store/store';

const ProductPreview = ({ product }) => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;

    const handleAddToCart = async (product) => {
        const existItem = cart.cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        // const { data } = await axios.get(`/api/products/${product._id}`)

        if (product.stock < quantity) {
            window.alert('no more items')
            return
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    }

    return (
        <div className="product-preview">
            <Link to={`/product/${product.slug}`}>
                <img src={product.img1} alt={product.title} />
            </Link>
            <p>{product.title}</p>
            <p>Rating:{product.rating}({product.numOfReviews})</p>
            <p>${product.price}</p>
            {
                product.stock < 1
                    ? <button disabled>out of stock</button>
                    : <button onClick={()=>handleAddToCart(product)}>Add 2 cart</button>
            }
        </div>
    )
}

export default ProductPreview