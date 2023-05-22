import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useAuthStore from "../hooks/useAuthStore";
import Theme from "../components/Theme"
import Icon from "../components/Icon"
import {HiOutlineUserCircle } from 'react-icons/hi2'
import { IoLogOutOutline } from 'react-icons/io5'


function Navbar({ isAdmin , setShowNavbar , handleRegisterClick }) {
    const [theme, setTheme] = useState(false);
    const [isDark, setIsDark] = useState(false);
   

    const authStore = useAuthStore()
  
    useEffect(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }, []);
  
    useEffect(() => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [theme]);
  
  
  const isAuthenticated = authStore.isAuthenticated();
  const user = useAuthStore((state) => state.user);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };
  
    useEffect(() => {
        const loadUser = authStore.loadUser();
    
      }, []);
  const items = [
    { title: "Home", url: "/" },
    { title: "Fahrzeuge", url: "/e-vehicles" },
    { title: "Über-uns", url: "/About-us" },
    { title: "Kontakt", url: "/contact" },
  ];
  const userNavigation = [
    { title: " Buchungen", url: "/reservation-view" },
    
  ];
  const adminNavigation = [
    { title: "Fahrzuege hinfüge", url: "/admin-view" },
    { title: "Kunden Buchungen", url: "/reservation-view" },
  ];

  const closeNavbar =()=> {
    if (window.innerWidth < 768) {
      setShowNavbar(false)
    }
  }
  return (

  
    <nav className=" border-t md:border-none h-screen  md:h-fit md:static border-gray-300 bg-gray-100 dark:bg-slate-900 flex  md:justify-between flex-col md:flex-row-reverse justify-start w-screen md:w-full  items-center m-0 z-100   fixed  md:pt-0 pt-2 top-20   ">
      <div className=" md:flex items-center justify-center md:justify-end w-fit  md:mr-0  ">
          {!isAuthenticated ? (
            <div className="flex flex-row gap-4">
              <button onClick={closeNavbar}
                className="  hover:scale-105 font-light text-xl  lg:text-2xl text-green-600 dark:text-green-500 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <Link to="/login">Login</Link>
              </button>
              <button
              onClick={closeNavbar}
                
                className="hover:scale-105 font-light text-xl lg:text-2xl text-green-600 dark:text-green-500 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <Link to="/register">Register</Link>
              </button>
              <Theme handleThemeSwitch={handleThemeSwitch} isDark={isDark} />
            </div>
          ) : (
            <div className="flex  text-3xl  w-full justify-center items-center gap-4 py-2 ">
              <Icon text={isAuthenticated && authStore.user.username }> < HiOutlineUserCircle  color={!isDark?" #475569":"#94a3b8"} size={36} /> </Icon>
              <Icon text="logout" action={() => authStore.logout()}> < IoLogOutOutline color={!isDark?" #475569":"#94a3b8"} size={36} /> </Icon>
              <Theme handleThemeSwitch={handleThemeSwitch} isDark={isDark} />
            </div>
          )}
       
        </div>
      <ul className="flex flex-col md:flex-row justify-start md:items-center items-end md:pl-2 border-t w-full md:border-none md:w-fit pt-8 md:pt-0   gap-4 h-screen md:h-full   ">
        {items.map((item) => (
          <li onClick={closeNavbar} key={item.title} className=" font-base   text-xl  text-green-600 dark:text-green-500 hover:text-gray-600 ">
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
        {isAuthenticated ? user?.role?.name==="admin" ? ( adminNavigation.map((item) => (
          <li onClick={closeNavbar} key={item.title} className="  font-base     lg: text-xl text-green-600 dark:text-green-500 hover:text-gray-600 ">
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))):( userNavigation.map((item) => (
          <li onClick={closeNavbar} key={item.title} className=" font-base    text-xl text-green-600 dark:text-green-500 hover:text-gray-600 ">
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))) :null}
      </ul>
    </nav>
  );
}

export default Navbar;
