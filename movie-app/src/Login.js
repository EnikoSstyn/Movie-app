import React, { useRef, useState } from 'react';
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const  { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
         try {
            setError('')
            setLoading(true)
           await login(emailRef.current.value, passwordRef.current.value)
           history.push('/');
         } catch {
             setError('Failed to log in');
         }
        setLoading(false)
    }

    return (
        <>
        <main>
        <div className="mt-5">
            <h2 className="text-center mb-4">Log In</h2>
            {error &&
            <div className={`alert mt-3 alert-danger`} role="alert">
                {error}
            </div>
            }
            <form className="mb-3" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" className=" mb-3 form-control" id="email" ref={emailRef} required />
                <label htmlFor="password">Password</label>
                <input type="password" className="mb-3 form-control" id="password" ref={passwordRef} required />
                <button disabled={loading} type="submit" className="w-100 btn btn-info">Log In</button>
                </form>
        </div>
                <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign Up</Link>
                </div>
        </main>
        </>
    )
}
