import { createContext, useReducer } from 'react';
import { cartReducer } from './reducers';


export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    },
};



export function StoreProvider(props) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}