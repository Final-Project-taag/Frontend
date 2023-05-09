// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import '../scss/App.scss';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import MainPage from './components/MainPage';
// import Register from './components/Register';
// import Login from './components/Login';
// import AboutUs from "./components/AboutUs";
// import ContactPage from "./components/Contact";
// import Booking from './components/Booking';
// import EVehicles from './components/E-Vehicles';
// import ReservationView from "./components/ReservationView";

// function App() {

//     return (
//         <div className='h-screen-full'>
//         <BrowserRouter>

//             <Header />
                     
//             <Routes>
                
//             <Route path='/' element={<MainPage/>} />
//               <Route path='/register' element={<Register/>} />
//               <Route path='/login' element={<Login/>} />
//               <Route path='/about-us' element={<AboutUs/>} />
//               <Route path='/e-vehicles' element={<EVehicles/>} />
//               <Route path='/contact' element={<ContactPage/>} />
//              <Route path='/booking/:vehicleId' element={<Booking/>} />
//              <Route path='/reservation-view' element={<ReservationView/>} />
 
//             </Routes>
//             <Footer />
//         </BrowserRouter>
        
//         </div>
//     );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../scss/App.scss';
import Header from './pages/Header.jsx';
import Footer from './pages/Footer.jsx';
import MainPage from './pages/MainPage.jsx';
import Register from './forms/Register';
import Login from './forms/Login';
import AboutUs from "./pages/AboutUs.jsx";
import ContactPage from "./pages/Contact.jsx";
import Booking from './components/Booking';
import EVehicles from './components/E-Vehicles';
import ReservationView from "./components/ReservationView";
import EmailVerification from "./components/EmailVerification.jsx"
// import BookingVehicle from "./components/BookingVehicle.jsx";
// import BookingView from "./components/BookingView";
import PaymentSuccess from "./components/PaymentSucess";

function App() {

  return (
    <div className='h-screen-full'>
 
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
          <Route path='/paymentsucess' element={<PaymentSuccess/>} />
          <Route path='/verify' element={<EmailVerification />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;