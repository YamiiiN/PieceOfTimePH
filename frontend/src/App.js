import React from 'react';
import Home from './screens/User/Home';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/RegisterCard';
import Dashboard from './screens/Admin/Dashboard';
import Products from './components/Admin/Products';
import ProductDetails from './screens/User/ProductDetails';
import Cart from './screens/User/Cart';
import ProductList from './screens/User/ProductList';
import LandingPage from './screens/User/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/register" element={<SignUp />} exact />

          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/productdetails" element={<ProductDetails />} exact />
          <Route path="/productlisting" element={<ProductList />} exact />
          <Route path="/cart" element={<Cart />} exact />

        </Routes>
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/admin/products" element={<Products />} exact />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
