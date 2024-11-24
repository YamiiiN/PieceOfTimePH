import React, { useEffect, useState } from 'react';
import Home from './screens/User/Home';
import LoginPage from './screens/User/Login';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
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
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
// import ProductListing from './components/Products/ProductListing';
import ProductDetails from './screens/User/ProductDetails';
import ProductCreate from './components/Admin/ProductCreate';
import ProductUpdate from './components/Admin/ProductUpdate';
import OrderList from './components/Admin/OrderList';

// IMPORTS FOR USERS
import OrderOfUser from './screens/User/OrderOfUser'

// IMPORTS FOR ADMIN
// import ProductDetails from './components/Products/Details'
import ProductList from './screens/User/ProductList';
import Profile from './screens/User/Profile';

// FCM NOTIF
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./utils/firebase";
import { baseUrl, VAPID_KEY } from './assets/constants';

import { register } from './serviceWorker';
import axios from 'axios';
// import { useSelector } from 'react-redux';

function App() {
  const [user, setUser] = useState(null);

  const {access_token} = useSelector(state => state.auth);
  console.log(access_token)
  const sendTokenToServer = async ({ token }) => {
    try {

      const {data} = await axios.post(`${baseUrl}/user/save/token`, {token: token}, {
        headers:{
          "Authorization": `Bearer ${access_token}`
        }
      })

      

    } catch (error) {

      console.log(error)

    }
  }

  const requestPermission = async () => {

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      if (access_token) {
        sendTokenToServer({token: token})
      }

      console.log("Token generated : ", token);

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {

      console.log(payload)

    });

    return () => {
      unsubscribe();
    };

  }, [access_token])

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user)
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
              <Route path="/profile" element={<Profile />} exact />

              <Route path='/login'
                element={user ? <Navigate to={'/home'} /> : <LoginPage />}
              />
              {/* <Route path="/login" element={<LoginPage />} exact /> */}


              <Route path="/product/get/all" element={<ProductList />} exact />

              <Route path="/product/:id" element={<ProductDetails />} exact />

              {/* CART ROUTE */}
              <Route path='/cart' element={<Cart />} />

              {/* ORDER ROUTE */}
              {/* <Route path='/orderOfUser'
                element={user ? <OrderOfUser /> : <Navigate to={'/login'} />}
              /> */}
              {/* <Route path="/order/orderOfUser" element={<OrderOfUser />} exact /> */}

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
