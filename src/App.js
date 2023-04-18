import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from './Components/Pages/Home';
import { useEffect, useState } from 'react';
import LightLoadingScreen  from './Components/Common/LoadingScreen';
import UserAccountForm, { LoginPage } from './Components/Pages/Auth/UserAccountForm';
import CreateEvent from './Components/Pages/Event/CreateEvent';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App">
      {loaded? 
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<UserAccountForm />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/event' element={<CreateEvent />}/>
          <Route path='*' element={<h1>404$ Page Not Found</h1>}/>
        </Routes>
      </Router>
      :<LightLoadingScreen />}
    </div>
  );
}

export default App;
