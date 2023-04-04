import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './services/privateRout';
import Register from './components/Register';
import Login from './components/Login';
import useAuthStore from './hooks/useAuthStore';
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
//import Contact from "./components/Contact";
import CardGrid from './components/AllCars';


import { UserCircleIcon } from "@heroicons/react/24/outline";




function App() {

  const authStore = useAuthStore();


  return (
    <div className="App w-full h-full ">
      <div className='container w-full h-full '>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>

              <Route index element={<h2>zwar musst du dich  jeder refresh anmelden, aber es funktioniert! hoffentlich...</h2>} />

              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/allcars' element={<CardGrid />} />
              <Route path='/about-us' element={<AboutUs />} />
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
