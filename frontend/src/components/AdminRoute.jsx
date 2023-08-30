import React, { useContext } from 'react'
import { Store } from '../store/store';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const { state } = useContext(Store);
    const { userInfo } = state;
    return (
        userInfo?.isAdmin ? children : <Navigate to='/login' />

    )
}

export default AdminRoute