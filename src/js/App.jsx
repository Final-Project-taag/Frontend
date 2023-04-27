import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../scss/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/Contact";
import Booking from './components/Booking';
import EVehicles from './components/E-Vehicles';
import ReservationView from "./components/ReservationView";

function App() {

    return (
        <div className='h-screen-full'>
          {/*   <div>
      <h1>Verfügbare Fahrzeuge</h1>
      <ul>
        {vehicleCounts.map((vehicleCount) => (
          <li key={vehicleCount._id}>
            {vehicleCount._id}: {vehicleCount.count} Stück
          </li>
        ))}
      </ul>
    </div> */}
        <BrowserRouter>

            <Header />
                     
            <Routes>
                
            <Route path='/' element={<MainPage/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/about-us' element={<AboutUs/>} />
              <Route path='/e-vehicles' element={<EVehicles/>} />
              <Route path='/contact' element={<ContactPage/>} />
             <Route path='/booking/:vehicleId' element={<Booking/>} />
             <Route path='/reservation-view' element={<ReservationView/>} />
 
            </Routes>
            <Footer />
        </BrowserRouter>
        
        </div>
    );
}

export default App;


