import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SignInPage = () => {

    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    return (
        <div>
            <h1>SIGN IN</h1>
            <form action="">
                <label type='email'  >Email </label>
                <input type="text" required />
                <br />
                <label type='password'  >Password </label>
                <input type="password" required />
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