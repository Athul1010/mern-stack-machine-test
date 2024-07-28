import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Components/Table';
import Register from './Components/Register';
import Edit from './Components/Edit';
import Login from './Components/Login';
import DashBoard from './Components/DashBoard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/table' element={<Table/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/table/edit/:id' element={<Edit/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
