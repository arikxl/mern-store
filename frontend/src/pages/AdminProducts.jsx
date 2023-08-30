import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../store/store';
import axios from 'axios';
import { getError } from '../utils/util';
import { toast } from 'react-toastify';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Msg from '../components/Msg';


const productsReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload, page: action.payload.page, pages: action.payload.pages }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true }
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreate: false }
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false, error: action.payload }
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false }
        case 'DELETE_SUCCESS':
            return { ...state, loadingDelete: false, successDelete: true }
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false, successDelete: false }

        default:
            return state;
    }
}

const AdminProducts = () => {

    const [{ loading, products, pages, error, loadingCreate, loadingDelete }, dispatch] = useReducer(productsReducer, {
        loading: true, error: ''
    })

    const { state } = useContext(Store);
    const { userInfo } = state;

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/products/`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                //    ERR NOT ERROR FROM UP
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err)
                })
            }
        }
        fetchData()
    }, [ userInfo, products])
    // console.log(products[0])


    const createHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' })
            const { data } = await axios.post(`/api/products/`,
                {},
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
            toast.success('PRODUCT CREATED SUCCESSFULLY');
            dispatch({ type: 'CREATE_SUCCESS' });
            navigate(`/admin/product/${data.product._id}`)
        } catch (err) {
            toast.error(getError(err))
            dispatch({
                type: 'CREATE_FAIL',
                payload: getError(err)
            })
        }

    }

    const deleteHandler = async (product) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch({ type: 'DELETE_REQUEST' })
            try {
                await axios.delete(`/api/products/${product._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                })
                toast.success('Product deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' })


            } catch (err) {
                toast.error(getError(err));
                dispatch({ type: 'DELETE_FAIL' })
            }
        }
    }

    return (
        <div>
            <h1>
                AdminDashboard!!
            </h1>
            <button onClick={createHandler}>CREATE NEW PRODUCT</button>
            {loadingCreate && (<mark>LOADING...</mark>)}
            {loadingDelete && (<div>LOADING...</div>)}

            {loading
                ? (<mark>LOADING...</mark>)
                : error ? (<Msg color='pink'>{error}</Msg>)
                    : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>IMG</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRANDS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td><img src={product.img1} width='60px' /></td>
                                            <td>{product._id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <button disabled={loadingDelete} onClick={() => deleteHandler(product)}>X</button>
                                                &nbsp;
                                                <Link to={`/admin/product/${product._id}`}>
                                                    <button>EDIT</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <Link className={x + 1 === Number(page) ? 'bold' : ' '}
                                        to={`/admin/products?page=${x + 1}`} key={x + 1}
                                    >
                                        {x + 1}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )
            }

        </div>
    )
}

export default AdminProducts