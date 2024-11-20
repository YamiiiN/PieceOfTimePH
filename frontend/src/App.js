import React from 'react';
import Home from './screens/User/Home';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/RegisterCard';
import MiniDrawer from './screens/Admin/ToolBoard';
import ProductDetails from './screens/User/ProductDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/register" element={<SignUp />} exact />
          <Route path="/dashboard" element={<MiniDrawer />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/productdetails" element={<ProductDetails />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
