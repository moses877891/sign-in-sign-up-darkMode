import { useContext, useState } from 'react';

import { UserContext } from '../../context/user.context';
import { DarkModeContext } from '../../context/darkmode.context'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firbase.utils';

import './sign-up.component.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("cannot create user, user already in use");
            }
            console.log('user creating encountered an error', error);
        }

    }

    const handleEvent = event => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value })
    }

    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`w-full max-w-md ${darkMode ? 'text-white' : 'text-black'}`}>
            <form
                onSubmit={handleSubmit}
                className="px-8 pt-6 pb-8 mb-4">
                <label>Display name</label>
                <input
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleEvent}
                    className='appearance-none border 
                    rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />

                <label>email</label>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleEvent}
                    className='appearance-none border 
                    rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />

                <label>password</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleEvent}
                    className='appearance-none border 
                    rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />

                <label>confirmPassword</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleEvent}
                    className='appearance-none border 
                    rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:outline-none focus:shadow-outline'
                    style={{ color: 'black' }}
                />

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white 
                    font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline'>
                    sign up
                </button>
            </form>
        </div>
    );
}

export default SignUp;