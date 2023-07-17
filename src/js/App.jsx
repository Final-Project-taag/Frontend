import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "../scss/App.scss";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import Register from "./forms/Register";
import Login from "./forms/Login";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/Contact";
import Booking from "./components/Booking";
import EVehicles from "./pages/E-Vehicles";
import ReservationView from "./pages/ReservationView";
import PaymentSuccess from "./components/PaymentSucess";
import AdminAdd from "./pages/AdminView";
import ClientBookings from "./pages/ClientBookings";
import BookingList from "./pages/BookingList";
import ReservationCard from "./components/ReservationCard";

function App() {
  return (
    <div className="h-full bg-gray-100 dark:bg-slate-900 ">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/e-vehicles" element={<EVehicles />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking/:vehicleId" element={<Booking />} />
          <Route path="/reservation-view" element={<ReservationView />} />
          <Route path="/admin-view" element={<AdminAdd />} />
          <Route path="/client-bookings" element={<ClientBookings />} />
          <Route path="/paymentsucess" element={<PaymentSuccess />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
