import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuthStore from './hooks/useAuthStore';
import '../scss/App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './services/privateRout';
import Register from './components/Register';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import ReservationView from'./components/ReservationView';
import Services from './components/Services';
import ContactPage from "./components/Contact";
import Booking from './components/Booking';
import CardGrid from './components/AllVehicles';





/* import { UserCircleIcon } from "@heroicons/react/24/outline"; */
import Contact from './components/Contact';



/* import { UserCircleIcon } from "@heroicons/react/24/outline"; */

function App() {
    const authStore = useAuthStore();

    return (
        <div className='h-screen-full'>
        <BrowserRouter>

            <Header />
                     
            <Routes>
            <Route path='/' element={<MainPage/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/about-us' element={<AboutUs/>} />
            {  <Route path='/services' element={<Services/>} />}
              <Route path='/contact' element={<ContactPage/>} />
              <Route path='/booking' element={<Booking/>} />
              <Route path='/allvehicles' element={<CardGrid/>} />
              <Route path="/booking/:vehicleId" element={<Booking/>} />
              <Route path='/reservation-view' element={<ReservationView/>} />
              {/* protected wird später verwindet */}
              {/* <Route path='/protected' element={<ProtectedPage />} /> */}
            
            </Routes>
            <Footer />
        </BrowserRouter>
        
        </div>
    );
}

export default App;


