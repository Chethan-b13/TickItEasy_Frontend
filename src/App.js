import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from './Components/Pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<h1>404$ Page Not Found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
