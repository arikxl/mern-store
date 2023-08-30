import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../store/store';
import axios from 'axios';
import { getError } from '../utils/util';
import Msg from '../components/Msg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const adminOrderReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
      case 'DELETE_FAIL':
        return { ...state, loadingDelete: false, }
      case 'DELETE_RESET':
          return { ...state, loadingDelete: false, successDelete: false }
    
    default:
      return state;
  }
}

const AdminOrders = () => {

    const navigate = useNavigate();

  const [{ loading, orders, error, loadingDelete, successDelete }, dispatch] = useReducer(adminOrderReducer, {
    loading: true, error: ''
  })

  const { state } = useContext(Store);
  const { userInfo } = state;


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {

        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET'})
    } else {
      fetchData()
    }
  }, [userInfo, successDelete])

  const deleteOrder = async (order) => {
    
    if (window.confirm('Are you sure you want to delete this order?')) { 
      try {
        dispatch({ type: 'DELETE_REQUEST' })
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        toast.success('Order deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' })


      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'DELETE_FAIL' })
      }
    }
  }

  return (
    <div>
      <h1>orders</h1>
      {loadingDelete && ('LOADING...')}
      {loading
        ? ('LOADING...')
        : error ? <Msg color={'pink'}>{error}</Msg>
          : (

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td className={!order.isPaid && 'red'}>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</td>
                    <td className={!order.isDelivered && 'red'}>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'NO'}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                      &nbsp;
                      <button disabled={loadingDelete }
                        onClick={()=>deleteOrder(order)}
                      >
                        DELETE
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          )}
    </div>
  )
}

export default AdminOrders