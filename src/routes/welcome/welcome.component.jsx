import { useContext } from "react";

import { DarkModeContext } from "../../context/darkmode.context";

const WelcomePage = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
            You are already loged in</div>
    )
}

export default WelcomePage;