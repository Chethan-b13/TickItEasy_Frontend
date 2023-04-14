import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from './Components/Pages/Home';
import { useEffect, useState } from 'react';
import LoadingScreen from './Components/Common/LoadingScreen';
import UserAccountForm, { LoginPage } from './Components/Pages/Auth/UserAccountForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
      setLoaded(true);
  }, []);
  return (
    <div className="App">
      {loaded? 
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<UserAccountForm />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='*' element={<h1>404$ Page Not Found</h1>}/>
        </Routes>
      </Router>
      :<LoadingScreen />}
    </div>
  );
}

export default App;
