import { Link, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { User } from "react-feather";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
function Header() {
  useEffect(() => {
    document.addEventListener('click', () => { setMobileNav(false) }, true);
    return () =>
{ document.removeEventListener('click', () => { setMobileNav(false)}, true); }; }, []);
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const isAuthenticated = authStore.isAuthenticated(); // Add this line to check authentication status
  const handleRegisterClick = () => {
    navigate('/register');
};
 const [mobileNav, setMobileNav]= useState(false);
const onToggleMenu = (evt)=> {
    evt.stopPropagation();
    setMobileNav(!mobileNav);
}
  return (
    <div className="fixed z-50 flex border-b justify-center items-center top-0">
      <div className="  w-screen h-fit flex justify-between  py-1 px-7  bg-white">
        <div className="flex  m-0">
          <Link to="/">
            {" "}
            <button className=" py-1 px-1 " type="button">
              <img
                src="logo-tranparint.webp"
                className=" h-14 w-14 text-gray-700"
              />
            </button>
          </Link>
        </div>
        <div className="md:flex justify-center  items-center m-0 hidden">
          <ul className="flex justify-center items-center gap-5 ">
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600">
              <Link to="/e-vehicles">E-Fahrzeuge</Link>
            </li>
            {isAuthenticated && (
              <li className=" font-light text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
                <Link to={"/reservation-view/buchungen"}>Buchungen</Link>
              </li>
            )}
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
              <Link to="/About-us">Über uns</Link>
            </li>
          </ul>
        </div>
        <div className=" md:flex items-center justify-center m-0 hidden">
          {!isAuthenticated && (
            <div className="flex flex-row gap-4">
              <button
                className="  hover:scale-105 font-light text-2xl text-green-600 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <Link to="/login">Login</Link>
              </button>
              <button
                onClick={handleRegisterClick}
                className="hover:scale-105 font-light text-2xl text-green-600 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex flex-row gap-2 ">
              <div>
                <UserCircleIcon className="h-12 w-10 text-gray-700" />
                {authStore.isAuthenticated()
                  ? authStore.user.fullname
                  : "Anonymous"}
              </div>
              <button
                onClick={(evt) => authStore.logout()}
                className=" hover:scale-105 flex items-center  gap-1 text-green-500 focus:outline-none focus:shadow-outline"
                type="button"
              >
                <svg
                  className="h-8  text-green-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
        <div class="flex items-center justify-center md:hidden m-0">
                <ion-icon onClick={(evt)=> onToggleMenu(evt)} name="menu"  class="text-3xl  cursor-pointer md:hidden text-green-500"></ion-icon>
            </div>
      </div>
      <Outlet />
      <div className={`mobile-nav flex flex-col px-4 pt-36 gap-1 absolute bg-white w-full ${mobileNav ? 'block':'hidden'}`}
        onClick={ (evt) => evt.stopPropagation()}
        >
         <ul>
         <li className=" font-light text-2xl text-green-600 hover:text-gray-600">
              <Link to="/e-vehicles">E-Fahrzeuge</Link>
            </li>
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600">
              <Link to="/reservation-view">Reservierungen</Link>
            </li>
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600">
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className=" font-light text-2xl text-green-600 hover:text-gray-600">
              <Link to="/About-us">Über uns</Link>
            </li>
        </ul>
      <div className='flex gap-3 p-2  '>
    <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/login'>Login</Link>
            </button>
            <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/register'>register</Link>
            </button>
    </div>
    </div>
    </div>
  );
}
export default Header;