import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Customers/Pages/Home";
import Contact from "../components/Customers/Pages/Contact";
import NoPage from "../components/Customers/Pages/NoPage";
import About from "../components/Customers/Pages/About";
import TermsConditions from "../components/Customers/Pages/TermsConditions";
import TradeinForm from "../components/Customers/Pages/TradeinForm";
import CustomerInfoForm from "../components/Customers/Pages/CustomerInfoForm";
import HomeLayout from "../components/Customers/Layout/HomeLayout";
import TradeList from "../components/Customers/Pages/TradeHistory";
import AuthLayout from "../components/Customers/Layout/AuthLayout";
import PrivacyPolicy from "../PrivacyPolicy";
import CookiePolicy from "../CookiePolicy";
import AddTrade from "../components/Trade/AddTrade";
import CompetitivePricing from "../components/Customers/Pages/CompetitivePricing;";
import CPODevices from "../components/Customers/Pages/CPODevices";
import NewDevices from "../components/Customers/Pages/NewDevices";
import Leasing from "../components/Customers/Pages/Leasing";
import Manuals from "../components/Customers/Pages/Manuals";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Customer Routes */}
      <Route path="/" element={<HomeLayout />}>
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="tradein" element={<TradeinForm />} />
        <Route path="terms" element={<TermsConditions />} />
        <Route path="tradein/trade-quote" element={<TradeinForm />} />
        <Route path="tradein/customer-info" element={<CustomerInfoForm />} />
        <Route path="*" element={<NoPage />} />
        <Route path="trade-history" element={<TradeList />} />
        <Route path="tradein/add" element={<AddTrade />} />
        <Route
          path="tradein/competitive-pricing"
          element={<CompetitivePricing />}
        />
        <Route path="cpodevices" element={<CPODevices />} />
        <Route path="newdevices" element={<NewDevices />} />
        <Route path="manuals" element={<Manuals />} />
        <Route path="leasing" element={<Leasing />} />
        <Route index element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Route>

      <Route path="/" element={<AuthLayout />}></Route>

      {/* Fallback Route */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}
