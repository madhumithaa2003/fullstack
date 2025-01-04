import React from 'react';
import {Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import AddOrder from './components/AddOrder';
import GetOrder from './components/GetOrder';
import GetAllOrders from './components/GetAllOrders';
import UpdateOrder from './components/UpdateOrder';
import DeleteOrder from './components/DeleteOrder';


const App = () => {
  return (
    <div className="App">
      <Router>
      <h1>Home page</h1>
      <Link to="/about">About</Link>
      <Routes>
          <Route path="/about" element={<About/>} />
          <Route path='/addorder' element={<AddOrder/>} />
          <Route path='/getorder' element={<GetOrder/>} />
          <Route path='/getall' element={<GetAllOrders/>} />
          <Route path='/updateorder' element={<UpdateOrder/>} />
          <Route path='/deleteorder' element={<DeleteOrder/>} />
      </Routes>
      </Router>      
    </div>
  );
};

export default App;
