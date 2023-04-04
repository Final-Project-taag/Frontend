import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './services/privateRout';
import Register from './components/Register';
import Login from './components/Login';
import useAuthStore from './hooks/useAuthStore';
import Booking from './components/Booking';





/* import { UserCircleIcon } from "@heroicons/react/24/outline"; */
import Contact from './components/Contact';




function App() {
  const authStore = useAuthStore();


  return (
    <div className="App w-full">
      <div className='w-full'>

        
        

        
     
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              
              <Route index element={<h2>zwar musst du dich  jeder refresh anmelden, aber es funktioniert! hoffentlich...</h2>}/>

              <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/contact' element={<Contact/>} />

                <Route path='/booking' element={<Booking/>} />



              
              

              <Route element={<PrivateRoute />}>
                <Route path='/protected' element={<ProtectedPage />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
