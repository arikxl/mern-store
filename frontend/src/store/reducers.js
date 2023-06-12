

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}

export const productsItemReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, product: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload]
                }
            };
        default:
            return state;
    }
}