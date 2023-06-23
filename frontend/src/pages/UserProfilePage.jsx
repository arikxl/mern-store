import React, { useContext } from 'react'
import { Store } from '../store/store';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const navigate = useNavigate();

    const { state, dispatch:ctxDispatch } = useContext(Store);


    const signOutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('linoy-userInfo');
        localStorage.removeItem('linoy-shippingAddress');
        localStorage.removeItem('linoy-paymentMethod');
        
        navigate('/')
        // window.location.reload();
    }

    return (<>
        <div>UserProfilePage</div>
        <button onClick={signOutHandler}>sign out</button>
    </>
    )
}

export default UserProfilePage