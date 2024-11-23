import React, { useEffect, useState } from 'react';
import Home from './screens/User/Home';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/RegisterCard';
import Dashboard from './screens/Admin/Dashboard';
import Products from './components/Admin/Products';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from './screens/User/LandingPage';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { auth } from './utils/firebase'
import { Navigate } from 'react-router-dom'
import Cart from './screens/User/Cart';
import { store, persistor } from './state/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
// import ProductListing from './components/Products/ProductListing';
import ProductDetails from './screens/User/ProductDetails';
import ProductCreate from './components/Admin/ProductCreate';
import ProductUpdate from './components/Admin/ProductUpdate';
import OrderList from './components/Admin/OrderList';

// IMPORTS FOR USERS
import OrderOfUser from './components/User/OrderOfUser'

// IMPORTS FOR ADMIN
// import ProductDetails from './components/Products/Details'
import ProductList from './screens/User/ProductList';

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

              <Route path="/" element={<LandingPage />} exact />
              <Route path="/home" element={<Home />} exact />
              <Route path="/register" element={<SignUp />} exact />

              <Route path='/login'
                element={user ? <Navigate to={'/home'} /> : <LoginPage />}
              />
              {/* <Route path="/login" element={<LoginPage />} exact /> */}


              <Route path="/product/get/all" element={<ProductListing />} exact />

              <Route path="/product/:id" element={<ProductDetails />} exact />

              {/* CART ROUTE */}
              <Route path='/cart' element={<Cart />} />

              {/* ORDER ROUTE */}
              {/* <Route path='/orderOfUser'
                element={user ? <OrderOfUser /> : <Navigate to={'/login'} />}
              /> */}
              <Route path="orderOfUser" element={<OrderOfUser />} exact />

            </Routes>



            <Routes>

              {/* ADMIN ROUTES */}
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="/admin/products" element={<Products />} exact />

              <Route path='/product/create'
                element={user ? <ProductCreate /> : <Navigate to={'/login'} />}
              />

              <Route path='/product/update/:id'
                element={user ? <ProductUpdate /> : <Navigate to={'/login'} />}
              />

              {/* Orders */}
              <Route path='/orders'
                element={user ? <OrderList /> : <Navigate to={'/login'} />}
              />

            </Routes>

          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
