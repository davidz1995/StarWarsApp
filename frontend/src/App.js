import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signin" element={<Register/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
