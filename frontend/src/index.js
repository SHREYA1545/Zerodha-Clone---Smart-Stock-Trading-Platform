import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import HomePage from './landing_page/home/HomePage';
import SignUp from './landing_page/signup/SignUp';
import SupportPage from './landing_page/support/SupportPage';
import PricingPage  from './landing_page/home/Pricing';
import ProductsPage from './landing_page/products/ProductPage';
import About from './landing_page/about/AboutPage';
import NavBar from './landing_page/NavBar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import Login from './landing_page/Login';
import ForgotPassword from './landing_page/ForgotPassword';
import ResetPassword from './landing_page/ResetPassword';
import VerifyEmail from './landing_page/VerifyEmail';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <NavBar />
  <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/signup' element={<SignUp />}/>
    <Route path="/login" element={<Login />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password' element={<ResetPassword />} />
    <Route path='/verify-email' element={<VerifyEmail />} />
    <Route path='/support' element={<SupportPage/>} />
    <Route path='/pricing' element={<PricingPage />} />
    <Route path='/products' element={<ProductsPage />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound/>}/>
   
  </Routes>
 <Footer />
  </BrowserRouter> 
);