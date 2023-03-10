
import './App.css';
import Home from './pages/Home';
import {Route , Routes  } from 'react-router-dom' ;
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';




 


function App() {
  return (
      <Routes>
            <Route path='/' exact element = {<Home/>} />
            <Route path='/login' exact element = {<Login/>} />
            <Route path='/signup' exact element = {<Signup/>} />
            <Route path='/dashboard' exact element = {<Dashboard/>} />

      </Routes>
  );
}

export default App;
