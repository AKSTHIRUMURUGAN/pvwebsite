
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import{Route, BrowserRouter as Router, Routes}from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer}from "react-toastify"
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import Location from './components/Location';
import Paymentr from './components/Paymentr';
import Pslive from "./components/Pslive"

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  return (
    <Router>
    <div className="App">
      <HelmetProvider>
        <Header/>
        <ToastContainer theme='dark'/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/pslive' element={<Pslive/>}></Route>
            <Route path='/location' element={<Location/>}></Route>
            <Route path='/paymentr' element={<Paymentr/>}></Route>
             
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/myprofile' element={<ProtectedRoute> <Profile/></ProtectedRoute>}> </Route>
            <Route path='/myprofile/update' element={<ProtectedRoute> <UpdateProfile/></ProtectedRoute>}></Route>
            <Route path='/myprofile/update/password' element={<ProtectedRoute> <UpdatePassword/></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={<ForgotPassword/>}></Route>
            <Route path='/password/reset/:token' element={<ResetPassword/>}></Route>

           
            <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
            <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> }/>
            <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> }/>
            <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> }/>

            {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />
} 
          </Routes>

        {/* Admin Routes */}
        <Routes>
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> }/>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> }/>
          <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
        </Routes>
        <Footer/> 
      </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
