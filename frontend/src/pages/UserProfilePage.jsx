import React, { useContext } from 'react'
import { Store } from '../store/store';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(Store);


    const signOutHandler = () => {
        dispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('linoy-userInfo');
        navigate('/')
    }

    return (<>
        <div>UserProfilePage</div>
        <button onClick={signOutHandler}>sign out</button>
    </>
    )
}

export default UserProfilePage