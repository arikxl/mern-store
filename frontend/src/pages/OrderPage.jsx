import React, { useContext, useEffect, useReducer } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Msg from '../components/Msg'
import { reducer } from '../store/reducers';
import { Store } from '../store/store';
import { getError } from '../utils/util';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderPage = () => {

    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    function reducer(state, action) {
        switch (action.type) {
            case 'FETCH_REQUEST':
                return { ...state, loading: true, error: '' };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, order: action.payload, error: '' };
            case 'FETCH_FAIL':
                return { ...state, loading: false, error: action.payload };
            case 'PAY_REQUEST':
                return { ...state, loadingPay: true };
            case 'PAY_SUCCESS':
                return { ...state, loadingPay: false, successPay: true };
            case 'PAY_FAIL':
                return { ...state, loadingPay: false };
            case 'PAY_RESET':
                return { ...state, loadingPay: false, successPay: false };

            case 'DELIVER_REQUEST':
                return { ...state, loadingDeliver: true };
            case 'DELIVER_SUCCESS':
                return { ...state, loadingDeliver: false, successDeliver: true };
            case 'DELIVER_FAIL':
                return { ...state, loadingDeliver: false };
            case 'DELIVER_RESET':
                return {
                    ...state,
                    loadingDeliver: false,
                    successDeliver: false,
                };
            default:
                return state;
        }
    }

    const [
        {
            loading,
            error,
            order,
            successPay,
            loadingPay,
            loadingDeliver,
            successDeliver,
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        successDeliver: false,
        loadingPay: false,
        loadingDeliver: false,
    });


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userInfo) {
            return navigate('/login');
        }
        if (
            !order._id ||
            successPay ||
            successDeliver ||
            (order._id && order._id !== orderId)
        ) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
            if (successDeliver) {
                dispatch({ type: 'DELIVER_RESET' });
            }
        }
    }, [
        order,
        userInfo,
        orderId,
        navigate,
        successPay,
        successDeliver,
    ]);

    const handleDeliver = async () => {
        try {
            dispatch({ type: 'DELIVER_REQUEST' })
            const { data } = await axios.put(
                `/api/orders/${order._id}/deliver`,
                {},
                {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                }
            )
            dispatch({ type: 'DELIVER_SUCCESS', payload: data })
            toast.success('Order is Delivered!')

        } catch (error) {
            toast.error(getError(error))
            dispatch({ type: 'DELIVER_FAIL' })
        }
    }
    const handlePay = async () => {
        try {
            dispatch({ type: 'PAY_REQUEST' })
            const { data } = await axios.put(
                `/api/orders/${order._id}/pay`,
                {},
                {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                }
            )
            dispatch({ type: 'PAY_SUCCESS', payload: data })
            toast.success('Order is Paid!')

        } catch (error) {
            toast.error(getError(error))
            dispatch({ type: 'PAY_FAIL' })
        }
    }


    return (
        loading ? <h1>LOADING...</h1>
            : error ? <Msg color='pink'>{error}</Msg>
                : (

                    <div>

                        <h1>Preview order {order._id}</h1>
                        <div className="flex">
                            <div style={{ flex: '5' }}>
                                <div>
                                    <h2>shipping</h2>
                                    <p>{order.shippingAddress.fullName}</p>
                                    <p>{order.shippingAddress.address} ,{order.shippingAddress.city}</p>
                                    <p>{order.shippingAddress.zipcode}</p>
                                    {order.isDelivered ?
                                        <Msg color='lightgreen'>Deliverd at {order.deliveredAt.toLocaleString()}</Msg>
                                        : <Msg color='pink'>Not Delivered</Msg>}
                                </div>
                                <hr />
                                <div>
                                    <h2>Payment method</h2>
                                    <p>{order.paymentMethod}</p>
                                    {order.isPaid ?
                                        <Msg color='lightgreen'>Paid at {order.paidAt}</Msg>
                                        : <Msg color='pink'>Not Paid</Msg>}
                                </div>
                                <hr />
                                <div>
                                    <h2>ORDER ITEMS</h2>

                                    {
                                        order.orderItems.map((item) => (
                                            <div key={item._id} className="flex center">
                                                <img className="sml-img" src={item.img1} alt={item.title} />
                                                ||<Link to={`/product/${item.slug}`}> {item.title}  </Link>
                                                <p> || qty: {item.quantity}</p>
                                                <p> || $ {item.price}</p>
                                                <p> ||total:  $ {item.price * item.quantity}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <hr />




                            </div>
                            <div style={{ flex: '2' }} className='col'>
                                <h2>order summery</h2>
                                <p> || items: ${order.itemsPrice?.toFixed(2)}</p>
                                <p> || shipping: ${order.shippingPrice?.toFixed(2)}</p>
                                <p> || tax: ${order.taxPrice?.toFixed(2)}</p>
                                <p><mark>|| total: ${order.totalPrice?.toFixed(2)}</mark> </p>
                                {loading && <p>LOADING...</p>}

                                {userInfo.isAdmin && !order.isPaid && (
                                    <button disabled={loadingPay} className="btn-paid"
                                        onClick={handlePay}>
                                        ADMIN - MARK AS PAID
                                    </button>
                                )}
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <>
                                        {loadingDeliver && ('LOADING...')}
                                        <button disabled={loadingDeliver} className="btn-delivered"
                                            onClick={handleDeliver}>
                                            ADMIN - MARK AS DELIVERED
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>


                    </div>
                )
    )
}

export default OrderPage