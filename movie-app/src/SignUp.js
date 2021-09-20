import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const  { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        
         if(passwordRef.current.value !== passwordConfirmRef.current.value){
             return setError('Passwords do not match');
         }
         try {
            setError('')
            setLoading(true)
           await signup(emailRef.current.value, passwordRef.current.value)
           history.push('/');
         } catch {
             setError('Failed to create an account');
         }
        setLoading(false)
    }

    return (
        <>
        <main>
        <div className="mt-5">
            <h2 className="text-center mb-4">Sign up</h2>
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
                <label htmlFor="password-confirm">Password-confirmation</label>
                <input type="password" className="mb-3 form-control" id="password-confirm" ref={passwordConfirmRef} required />            
                <button disabled={loading} type="submit" className="w-100 btn btn-info">Sign Up</button>
                </form>
        </div>
                <div className="w-100 text-center mt-2">
                Already have an account? <Link to='/login'>Log In</Link>
                </div>
        </main>
        </>
    )
}
