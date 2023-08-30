import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../store/store';
import { getError } from '../utils/util';
import axios from 'axios';
import Msg from '../components/Msg';
// import { useNavigate } from 'react-router-dom';

import { Chart } from "react-google-charts";


const adminReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, summary: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}


const AdminDashboard = () => {

    const [{ loading, summary, error }, dispatch] = useReducer(adminReducer, {
        loading: true, error: ''
    })

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/orders/summary', {
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
    }, [userInfo])


    return (
        <div>
            <h1>
                AdminDashboard!!
            </h1>
            {loading
                ? (<mark>LOADING...</mark>)
                : error ? (<Msg color='pink'>{error}</Msg>)
                    : (
                        <>
                            <div className='flex'>
                                <div className='border'>
                                    <h2>{summary.users && summary.users[0]
                                        ? summary.users[0].numUsers
                                        : 0}
                                    </h2>
                                    <h3>Users</h3>
                                </div>
                                <div className='border'>
                                    <h2>{summary.orders && summary.orders[0]
                                        ? summary.orders[0].numOrders
                                        : 0}
                                    </h2>
                                    <h3>Orders</h3>
                                </div>
                                <div className='border'>
                                    <h2>${summary.orders && summary.orders[0]
                                        ? summary.orders[0].totalSales.toFixed(2)
                                        : 0}
                                    </h2>
                                    <h3>Total Sales</h3>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <h1>SALES</h1>
                                {summary.dailyOrders.length === 0
                                    ? (<Msg color='lightBlue'>No Sales</Msg>)
                                    : (
                                        <Chart
                                            data={[["Date", "Sales"],
                                            ...summary.dailyOrders.map((x)=>[x._id, x.sales])]}
                                            legendToggle
                                            loader={<div>LOADING CHART...</div>}
                                            chartType="AreaChart"
                                            width="100%"
                                            height="400px"
                                        />
                                    )
                                }


                            </div>
                            <div>
                                <h1>Sale For Day</h1>
                                {summary.productCategories.length === 0
                                    ? (<Msg color='lightBlue'>No Category</Msg>)
                                    : (
                                        <Chart
                                            data={[["Category", "Products"],
                                            ...summary.dailyOrders.map((x)=>[x._id, x.sales])]}
                                            loader={<div>LOADING CHART...</div>}
                                            chartType="PieChart"
                                            width="100%"
                                            height="400px"
                                        />
                                    )
                                }
                            </div>
                            <div>
                                <h1>CATEGORIES</h1>
                                {summary.productCategories.length === 0
                                    ? (<Msg color='lightBlue'>No Category</Msg>)
                                    : (
                                        <Chart
                                            data={[["Category", "Products"],
                                                ...summary.productCategories.map((x)=>[x._id, x.count])]}
                                            loader={<div>LOADING CHART...</div>}
                                            chartType="PieChart"
                                            width="100%"
                                            height="400px"
                                        />
                                    )
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default AdminDashboard