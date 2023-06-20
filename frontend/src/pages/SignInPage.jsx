import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../store/store';
import { toast } from 'react-toastify';
import { getError } from '../utils/util';



const SignInPage = () => {
    
    const navigate = useNavigate();
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {  userInfo } = state;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/users/login', {
                email, password
            });
            ctxDispatch({ type: 'USER_LOGIN', payload: data });
            localStorage.setItem('linoy-userInfo', JSON.stringify(data));
            window.location.reload();
            navigate(redirect || '/')
        } catch (error) {
            toast.error(getError(error))
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    },[navigate, redirect, userInfo])

    return (
        <div>
            <h1>SIGN IN</h1>
            <form onSubmit={handleSubmit}>
                <label type='email'  >Email </label>
                <input type="text" required
                    onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label type='password'  >Password </label>
                <input type="password" required
                    onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">LOGIN</button>
            </form>
            <p>new costumer?
                <Link to={`/signup?redirect=${redirect}`}>
                    create your account
                </Link></p>
        </div>
    )
}

export default SignInPage