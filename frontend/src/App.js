import './App.css';
import Login from './components/Login'
import Register from './components/Register.jsx'
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
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signin" element={<Register/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
