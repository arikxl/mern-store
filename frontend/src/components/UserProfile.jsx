import React, { useReducer, useState } from 'react'
import { toast } from 'react-toastify';
import { getError } from '../utils/util';
import axios from 'axios';
import { reducer } from '../store/reducers';


// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'USER_UPDATE_REQUEST':
//             return { ...state, loadingUpdate: true };
//         case 'USER_UPDATE_SUCCESS':
//             return { ...state, loadingUpdate: false };
//         case 'USER_UPDATE_FAIL':
//             return { ...state, loadingUpdate: false };

//         default:
//             return state;
//     }
// };

const UserProfile = ({ userInfo, ctxDispatch }) => {


    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    };


  return (
      <div>
          {loadingUpdate && <h2>loadingUpdate...</h2>}
          <form onSubmit={submitHandler}>
                  <label>Name</label>
                  <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />

              <label>Email</label>
              <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              <label>Password</label>
              <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                  />
              <label>Confirm Password</label>
                  <input
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              <div className="mb-3">
                  <button type="submit">Update</button>
              </div>
          </form>
    </div>
  )
}

export default UserProfile