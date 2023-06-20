import { createContext, useReducer } from 'react';
import { cartReducer } from './reducers';


export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('linoy-userInfo')
        ? JSON.parse(localStorage.getItem('linoy-userInfo'))
        : null,
    
    cart: {
        cartItems: localStorage.getItem('linoy-cartItems')
            ? JSON.parse(localStorage.getItem('linoy-cartItems'))
            : []
    },
  
 

    
};



export function StoreProvider(props) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}