import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Components/Table';
import Register from './Components/Register';
import Edit from './Components/Edit';
import Details from './Components/Details';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Table/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/view/:id' element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
