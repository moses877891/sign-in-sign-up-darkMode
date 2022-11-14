import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DarkModeContext } from '../../context/darkmode.context'

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firbase.utils';

import './sign-in.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password } = formField;

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await signInAuthUserWithEmailAndPassword(email, password);
        resetFormFields();
    }

    const handleEvent = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    }

    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/signup');
    }

    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`w-full max-w-md ${darkMode ? 'text-white' : 'text-black'}`}>
            <h2 className='text-center'>Sign in</h2>
            <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4'>
                <label>email</label>
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={handleEvent}
                    className='appearance-none border rounded 
                    w-full py-2 px-3 text-grey-700 leading-tight
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />

                <label>password</label>
                <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={handleEvent}
                    className=' appearance-none border rounded 
                    w-full py-2 px-3 text-grey-700 leading-tight
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />
                <div className='flex place-content-start'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white 
                font-bold py-2 px-4 mt-2 rounded-md focus:outline-none focus:shadow'>
                        sign in
                    </button>
                    <button
                        type='button'
                        className='bg-blue-500 hover:bg-blue-700 text-white 
                font-bold py-2 px-4 mt-2 ml-3 rounded-md focus:outline-none focus:shadow'
                        onClick={signInWithGoogle}
                    >
                        Google
                    </button>
                </div>
                <div className='text-center mt-4'>
                    <p>Don't have an account?</p>
                    <button
                        type='button'
                        className='bg-blue-200 hover:bg-blue-400
                         font-bold py-2 px-4 rounded-full
                         focus:outline-none focus:shadow'
                        style={{ color: 'black' }}
                        onClick={goToSignUp}>click to create a new account</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;