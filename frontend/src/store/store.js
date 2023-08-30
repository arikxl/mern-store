import { createContext, useReducer } from 'react';
import {  reducer } from './reducers';


export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('linoy-userInfo')
        ? JSON.parse(localStorage.getItem('linoy-userInfo'))
        : null,
    
    cart: {
        cartItems: localStorage.getItem('linoy-cartItems')
            ? JSON.parse(localStorage.getItem('linoy-cartItems'))
            : [],
        shippingAddress: localStorage.getItem('linoy-shippingAddress')
            ? JSON.parse(localStorage.getItem('linoy-shippingAddress'))
            : {},
        paymentMethod: localStorage.getItem('linoy-paymentMethod')
            ? localStorage.getItem('linoy-paymentMethod') 
            : '',
        
    },
    favItems:  localStorage.getItem('linoy-fav')
        ? JSON.parse(localStorage.getItem('linoy-fav'))
        : [],
 
};



export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}