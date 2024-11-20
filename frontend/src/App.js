import React from 'react';
import Home from './screens/User/Home';
import Dashboard from './screens/Admin/Dashboard';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolBoard from './screens/Admin/ToolBoard';
import Content from './components/Admin/Content';
import Revenues from './components/Admin/Revenues';
import SignUp from './components/User/RegisterCard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/register" element={<SignUp />} exact />
          <Route path="/dashboard" element={<ToolBoard />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/content" element={<Content />} exact />
          <Route path="/revenues" element={<Revenues />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
