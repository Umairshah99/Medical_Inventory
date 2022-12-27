import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Inventory from './Pages/Inventory';
import Signin from './Pages/Signin';

function App() {
  return (
    // <Inventory />

    <BrowserRouter>
      <Routes>
        <Route path="/Inventory" element={<Inventory /> }/>
         
        <Route path="/Sign_in" element={<Signin />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
