import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import log from "../../assets/logo.webp"

function Header() {
  const navigate = useNavigate();

  const [showNavBar, setShowNavbar] = useState(false);

  useEffect(() => {
      if (window.innerWidth > 768) {
        if(!showNavBar) setShowNavbar(true)
      }
  }, [window.innerWidth]);


  const handleRegisterClick = () => {
    navigate("/register");
  };


  
  return (
    <div className="fixed z-50  h-20 md:flex  items-center border-b top-0 bg-gray-100   dark:bg-slate-900  ">
      <div className="  w-screen  flex justify-center  items-center px-7   ">
        <div className="flex  w-24 ml-0">
          <Link to="/">
            <div  className=" py-1 px-1 ">
              <img
                src={log}
                className=" h-16 w-16 "
              />
            </div>
          </Link>
        </div>

        { showNavBar &&
       

        <Navbar handleRegisterClick = {handleRegisterClick}  setShowNavbar={setShowNavbar} 
        />
        }

        <div className="flex items-center  justify-center  m-0 mr-[-0.5rem] mt-[-0.5rem] text-5xl text-green-600 dark:text-green-500 cursor-pointer burger-icon md:hidden">
          <ion-icon className="" onClick={() => setShowNavbar((state)=> {
            
            return !state
            })} name="menu"></ion-icon>
            
        </div>
      </div>
    </div>
  );
}
export default Header;
