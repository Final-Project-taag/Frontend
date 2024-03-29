import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../scss/App.scss";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import Register from "./forms/Register";
import Login from "./forms/Login";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/Contact";
import Booking from "./components/Booking";
import EVehicles from "./components/E-Vehicles";
import ReservationView from "./components/ReservationView";





function App() {
  return (
   
    <div className='h-full'>
 
      <BrowserRouter>

        <Header />

        <Routes>

          <Route path='/' element={<MainPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/e-vehicles' element={<EVehicles />} />
          <Route path='/contact' element={<ContactPage />} /> 
          <Route path='/booking/:vehicleId' element={<Booking />} />
          <Route path='/reservation-view/:vehicleId' element={<ReservationView />} />
        </Routes>

        {/*  <Footer />  */}

      </BrowserRouter>

    </div>
  );
}

export default App;
