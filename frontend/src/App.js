import React, { useEffect, useState } from 'react';
import Home from './screens/User/Home';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/RegisterCard';
import ProductDetails from './screens/User/ProductDetails';
import ProductListing from './components/Products/ProductListing';
import Dashboard from './screens/Admin/Dashboard';
import Products from './components/Admin/Products';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { auth } from './utils/firebase'
import { Navigate } from 'react-router-dom'
import Cart from './components/Cart';

import { store, persistor } from './state/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const [user, setUser] = useState(null);

  // FCM NOTIF
  // const requestPermission = async () => {
  //   //requesting permission using Notification API
  //   const permission = await Notification.requestPermission();

  //   if (permission === "granted") {
  //     const token = await getToken(messaging, {
  //       vapidKey: "BHJEtgBYusoTixGiCiJBaTd96UgsN4UavQBYo9AlsfNekkaEvCRCUm0WMCPtT0HNed0WH7e9FgdEKzaW_UdUXsA",
  //     });

  //     //We can send token to server
  //     console.log("Token generated : ", token);
  //   } else if (permission === "denied") {
  //     //notifications are blocked
  //     alert("You denied for the notification");
  //   }
  // }






  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)

      // FCM NOTIF
      // requestPermission();

      console.log(user)
    })
  }, [])



  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>

            <Routes>
              {/* USER ROUTES */}
              <Route path="/" element={<Home />} exact />
              <Route path="/register" element={<SignUp />} exact />

              <Route path="/login" element={<LoginPage />} exact />
              <Route path="/product/get/all" element={<ProductListing />} exact />
              <Route path="/product/:id" element={<ProductDetails />} exact />

              <Route path='/cart' element={<Cart />} />

            </Routes>



            <Routes>

              {/* ADMIN ROUTES */}
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="/admin/products" element={<Products />} exact />

            </Routes>

          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
