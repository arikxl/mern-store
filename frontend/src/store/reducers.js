

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

            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existingItem
                ? state.cart.cartItems.map((item) => item._id === existingItem._id
                    ? newItem : item)
                : [...state.cart.cartItems, newItem];
            localStorage.setItem('linoy-cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id);
            localStorage.setItem('linoy-cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }

        
        default:
            return state;
    }
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return { ...state, userInfo: null };
        default:
            return state
    }
}


// export const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'CART_ADD_ITEM':

//             const newItem = action.payload;
//             const existingItem = state.cart.cartItems.find(
//                 (item) => item._id === newItem._id
//             );
//             const cartItems = existingItem
//                 ? state.cart.cartItems.map((item) => item._id === existingItem._id
//                     ? newItem : item)
//                 : [...state.cart.cartItems, newItem];
//             return {...state, cart: {...state.cart, cartItems}}

//         case 'CART_REMOVE_ITEM': {
//             const cartItems = state.cart.cartItems.filter(
//                 (item) => item._id !== action.payload._id);
//             return {...state, cart: {...state.cart, cartItems }}
//         }

        
//         default:
//             return state;
//     }
    
// }