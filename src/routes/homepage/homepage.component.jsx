import { useContext } from 'react';

import { DarkModeContext } from '../../context/darkmode.context';
import SignIn from '../../components/sign-in/sign-in.component';

import './homepage.styles.scss';

const Homepage = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <>
            <div className=' pt-10 flex flex-row place-content-evenly'>
                <SignIn />
            </div>
        </>
    )
}

export default Homepage;