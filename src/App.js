import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Inventory from './Components/Inventory';
import Signin from './Components/Signin';

function App() {
  return (
    // <Inventory />

    <BrowserRouter>
      <Routes>
        <Route path="/Inventory">
          <Inventory />  
        </Route> 
        <Route path="/Sign_in">
          <Signin />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
