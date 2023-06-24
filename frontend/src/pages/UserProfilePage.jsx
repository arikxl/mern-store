import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils/util';
import axios from 'axios';
import { toast } from 'react-toastify';
import Msg from '../components/Msg';
import UserProfile from '../components/UserProfile';




const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const UserProfilePage = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/orders/mine`,

                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [userInfo]);


    const signOutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('linoy-userInfo');
        localStorage.removeItem('linoy-shippingAddress');
        localStorage.removeItem('linoy-paymentMethod');

        window.location.href = '/login';
        // window.location.reload();
    }


    // const date = new Date(Date.now());
    // console.log('date:', date)
    // console.log( date.toLocalString())

    return (<>
        <div>UserProfilePage</div>
        <h2>Shalom {userInfo?.name}</h2>
        <UserProfile userInfo={userInfo} ctxDispatch={ctxDispatch} />
        <button onClick={signOutHandler}>sign out</button>
        {userInfo?.isAdmin && <h3>admin panel</h3>}
        <hr />
        <div>
            <p>orders:</p>
            {loading
                ? <h1>LOADING</h1>
                : error ? 
                    <Msg color='pink'>{error}</Msg>
                    : (

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    navigate(`/order/${order._id}`);
                                                }}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                )}
        </div>



    </>
    )
}

export default UserProfilePage