import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Store } from '../store/store';

const ProtectedRoutes = ({ children }) => {

    // const navigate = useNavigate();

    // navigate('/login?redirect=/shipping')
    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        userInfo ? children : <Navigate to='/login' />
    )
}

export default ProtectedRoutes