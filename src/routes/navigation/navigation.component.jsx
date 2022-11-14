import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as SunLogo } from '../../assets/emoticon-happy-smile-3-svgrepo-com.svg';
import { ReactComponent as LightLogo } from '../../assets/sun-svgrepo-com.svg';
import { ReactComponent as DarkLogo } from '../../assets/moon-svgrepo-com.svg';

import { signOutUser } from '../../utils/firbase.utils'

import { UserContext } from '../../context/user.context';
import { DarkModeContext } from '../../context/darkmode.context';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <div className='flex flex-row justify-between p-3'>
                <Link to='/'>
                </Link>
                <div className=' flex flex-row justify-end'>
                    <p className={`mr-2 mt-2 ${darkMode ? 'text-white' : 'text-black'}`}>{currentUser && currentUser.email}</p>
                    <span className={`mr-2 mt-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                        {
                            currentUser ? (
                                <span onClick={signOutUser}>SIGN OUT</span>
                            ) : (
                                <Link to='/'>SIGN IN</Link>)
                        }
                    </span>
                    <span className='mt-0'>
                        {
                            darkMode ? (
                                <DarkLogo className='small' onClick={toggleDarkMode} />
                            ) : (
                                <LightLogo className='small' onClick={toggleDarkMode} />)
                        }
                    </span>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation;