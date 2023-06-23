import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../store/store';
import { toast } from 'react-toastify';
import { getError } from '../utils/util';



const Register = () => {

    const navigate = useNavigate();
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';


    const [name, setNAme] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords dont match')
            return
        }

        try {
            const { data } = await axios.post('/api/users/register', {
                name, email, password
            });
            ctxDispatch({ type: 'USER_LOGIN', payload: data });
            localStorage.setItem('linoy-userInfo', JSON.stringify(data));
            // window.location.reload();
            navigate(redirect || '/')
        } catch (error) {
            toast.error(getError(error))
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (
        <div>
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit}>
                <label   >Name: </label>
                <input type="text" required
                    onChange={(e) => setNAme(e.target.value)} />
                <br />
                <label   >Email </label>
                <input type="email" required
                    onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label type='password'  >Password </label>
                <input type="password" required
                    onChange={(e) => setPassword(e.target.value)} />
                <br />
                <label  >Confirm Password </label>
                <input type="password" required
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account?
                <Link to={`/login?redirect=${redirect}`}>
                    LOGIN
                </Link></p>
        </div>
    )
}

export default Register