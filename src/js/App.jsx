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
import AboutUs from './components/Abot-us';
import Services from './components/Services';
import ContactPage from "./components/Contact";

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
              <Route path='/services' element={<Services/>} />
              <Route path='/contact' element={<ContactPage/>} />

              {/* protected wird später verwindet */}
              {/* <Route path='/protected' element={<ProtectedPage />} /> */}
            
            </Routes>
            <Footer />
        </BrowserRouter>
        
        </div>
    );
}

export default App;


