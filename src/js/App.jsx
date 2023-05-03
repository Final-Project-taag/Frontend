import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../scss/App.scss";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/Contact";
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
          <Route path='/reservation-view' element={<ReservationView />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
