import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../store/store';
import axios from 'axios';
import { getError } from '../utils/util';
import { toast } from 'react-toastify';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Msg from '../components/Msg';

const adminUsersReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload }
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

const AdminUsers = () => {

    const navigate = useNavigate();

    const [{ loading, users, error, loadingDelete, successDelete }, dispatch] = useReducer(adminUsersReducer, {
        loading: true, error: ''
    })

    const { state } = useContext(Store);
    const { userInfo } = state;


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/users`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (error) {

                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' })
        } else {
            fetchData()
        }
    }, [userInfo, successDelete])


    const deleteUser = async (user) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                dispatch({ type: 'DELETE_REQUEST' })
                await axios.delete(`/api/users/${user._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                })
                toast.success('User deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' })


            } catch (error) {
                toast.error(getError(error));
                dispatch({ type: 'DELETE_FAIL' })
            }
        }
    }

  return (
      <div>
          <h1>USERS</h1>
          {loadingDelete && ('LOADING...')}
          {loading
              ? ('LOADING...')
              : error ? <Msg color={'pink'}>{error}</Msg>
                  : (

                      <table>
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>NAME</th>
                                  <th>EMAIL</th>
                                  <th>IS ADMIN</th>
                                  <th>ACTIONS</th>
                              </tr>
                          </thead>
                          <tbody>
                              {users.map(user => (
                                  <tr key={user._id}>
                                      <td>{user._id}</td>
                                      <td>{user.name ? user.name : 'DELETED USER'}</td>
                                      <td>{user.email}</td>
                                      <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                      <td>
                                          <button
                                              onClick={() => {
                                                  navigate(`/admin/user/${user._id}`);
                                              }}
                                          >
                                              EDIT
                                          </button>
                                          &nbsp;
                                          &nbsp;
                                          <button disabled={loadingDelete}
                                              onClick={() => deleteUser(user)}
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

export default AdminUsers