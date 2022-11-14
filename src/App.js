import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'

import { UserContext } from './context/user.context';
import { DarkModeContext } from './context/darkmode.context';

import Navigation from './routes/navigation/navigation.component';
import Homepage from './routes/homepage/homepage.component';
import WelcomePage from './routes/welcome/welcome.component';
import SignUp from './components/sign-up/sign-up.component';

import './App.scss';

const App = () => {
  const { currentUser } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'darkColor' : 'lightColor'}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          {!currentUser ?
            (<Route index element={<Homepage />} />) :
            (<Route index element={<WelcomePage />} />)
          }
          {!currentUser ?
            (<Route path='/signup' element={<SignUp />} />) :
            (<Route index element={<WelcomePage />} />)
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
