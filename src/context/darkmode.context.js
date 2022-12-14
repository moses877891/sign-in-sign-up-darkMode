import { createContext, useState } from 'react';

export const DarkModeContext = createContext({
    darkMode: '',
    setDarkMode: () => null
});

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const value = { darkMode, setDarkMode };

    return <DarkModeContext.Provider value={value} >{children}</DarkModeContext.Provider>
}