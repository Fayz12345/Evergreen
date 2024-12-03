import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Customers/Pages/Home';
import Contact from '../components/Customers/Pages/Contact';
import NoPage from '../components/Customers/Pages/NoPage';
import Dashboard from '../components/Admin/Pages/Dashboard';
import AdminLayout from '../components/Admin/Layout/AdminLayout';
import Users from '../components/Admin/Pages/Users';
import Customers from '../components/Admin/Pages/Customers';
import CustomersList from '../components/Admin/Pages/CustomersList';
import Devices from '../components/Admin/Pages/Devices';
import Trade from '../components/Admin/Pages/Trade';
import Reports from '../components/Admin/Pages/Reports';
import AdminLogin from '../components/Admin/Pages/AdminLogin';
import ProtectedRoute from '../components/Admin/Pages/ProtectedRoute'; // Import ProtectedRoute
import TradeLanding from '../components/Customers/Pages/TradeLanding';
import About from '../components/Customers/Pages/About';
import TermsConditions from '../components/Customers/Pages/TermsConditions';
import TradeinForm from '../components/Customers/Pages/TradeinForm';
import CustomerInfoForm from '../components/Customers/Pages/CustomerInfoForm';
import Signup from '../components/Customers/Pages/signup';
import Login from '../components/Customers/Pages/Login';
import Incentive from '../components/Admin/Pages/Incentive';
import UsersList from '../components/Admin/Pages/UsersList';
import Manufacturer from '../components/Admin/Pages/Manufacturer';
import Model from '../components/Admin/Pages/Model';
import Memory from '../components/Admin/Pages/Memory';
import MemoryList from '../components/Admin/Pages/MemoryList';
import TradeInPage from '../components/Admin/Pages/TradeInPage';
import TradeHistory from '../components/Admin/Pages/TradeHistory';
import ModelList from '../components/Admin/Pages/ModelList';
import ManufacturerList from '../components/Admin/Pages/ManufacturerList';
import HomeLayout from '../components/Customers/Layout/HomeLayout';
import Profile from '../components/Customers/Pages/Profile';
import EditProfile from '../components/Customers/Pages/EditProfile';
import TradeList from '../components/Customers/Pages/TradeHistory';
import Auth from '../components/Customers/Pages/Auth';
import AuthLayout from '../components/Customers/Layout/AuthLayout';
import PrivacyPolicy from '../PrivacyPolicy';
import CookiePolicy from '../CookiePolicy';
import Batch from '../components/Admin/Pages/addBatch';
import ForgotPassword from '../components/Customers/Pages/ForgotPassword ';
import AddTrade from '../components/Trade/AddTrade';
import CompetitivePricing from '../components/Customers/Pages/CompetitivePricing;';
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Customer Routes */}
      <Route path="/" element={<HomeLayout />}>
        
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="tradein" element={<TradeLanding />} />
        <Route path="terms" element={<TermsConditions />} />
        <Route path="tradein/trade-quote" element={<TradeinForm />} />
        <Route path="tradein/customer-info" element={<CustomerInfoForm />} />
        <Route path="*" element={<NoPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="trade-history" element={<TradeList/>} />
        <Route path="tradein/add" element={<AddTrade/>} /> 
        <Route path="tradein/competitive-pricing" element={<CompetitivePricing />} />
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login-2" element={<Login />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="login" element={<Auth />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Route>
      
            
      <Route path="/" element={<AuthLayout />}>


      </Route>
      


      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="users/add" element={<Users />} />
          <Route path="trade" element={<Trade />} />
          <Route path="reports" element={<Reports />} />
          <Route path="customers/add" element={<Customers />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="incentive" element={<Incentive />} />
          <Route path="users" element={<UsersList />} />
          <Route path="manufacturer/add" element={<Manufacturer />} />
          <Route path="manufacturer" element={<ManufacturerList />} />
          <Route path="models/add" element={<Model />} />
          <Route path="memory/add" element={<Memory />} />
          <Route path="memory" element={<MemoryList />} />
          <Route path="trade-in" element={<TradeInPage />} />
          <Route path="trade-history" element={<TradeHistory />} />
          <Route path="models" element={<ModelList />} />
          <Route path="batch" element={<Batch />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
