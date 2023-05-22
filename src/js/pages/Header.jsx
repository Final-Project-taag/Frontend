import { Link, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { User } from "react-feather";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const isAuthenticated = authStore.isAuthenticated();
  const user = useAuthStore((state) => state.user);
  const [theme, setTheme] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

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

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };

  useEffect(() => {
    const loadUser = authStore.loadUser();
    document.addEventListener(
      "click",
      () => {
        setMobileNav(false);
      },
      true
    );
    return () => {
      document.removeEventListener(
        "click",
        () => {
          setMobileNav(false);
        },
        true
      );
    };
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const onToggleMenu = (evt) => {
    evt.stopPropagation();
    setMobileNav(!mobileNav);
  };
  return (
    <div className="fixed z-50  md:h-20 flex  justify-evenly items-center top-0 bg-gray-100 dark:bg-slate-900  ">
      <div className="  w-screen  flex justify-center  items-center px-7   ">
        <div className="flex  ml-0">
          <Link to="/">
            {" "}
            <button className=" py-1 px-1 " type="button">
              <img
                src="public/logo-tranparint.webp"
                className=" h-16 w-16 text-gray-700"
              />
            </button>
          </Link>
        </div>
        <div className="md:flex justify-center  items-center m-0 hidden">
          <ul className="flex justify-center items-center gap-5 ml-32 ">
            <li className=" font-light lg:text-3xl md:text-xl text-green-600 dark:text-green-500 hover:text-gray-600 hover:scale-105">
              <Link to="/e-vehicles">E-Fahrzeuge</Link>
            </li>
            {isAuthenticated && (
              <li className=" font-light lg:text-3xl md:text-xl text-green-600 dark:text-green-500 hover:text-gray-600 hover:scale-105">
                <Link to={"/reservation-view/buchungen"}>Buchungen</Link>
              </li>
            )}
            <li className=" font-light lg:text-3xl md:text-xl text-green-600 dark:text-green-500 hover:text-gray-600 hover:scale-105">
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className=" font-light lg:text-3xl md:text-xl text-green-600 dark:text-green-500 hover:text-gray-600 hover:scale-105">
              <Link to="/About-us">Über uns</Link>
            </li>
             {isAuthenticated && user?.role?.name === "admin" && (
           
              <li className=" font-light lg:text-3xl md:text-xl text-green-600 dark:text-green-500 hover:text-gray-600 hover:scale-105">
                <Link to="/admin-view">Admin View</Link>
              </li>
            )}
          </ul>
        </div>
        <div className=" md:flex items-center justify-center mr-0 hidden w-s">
          {!isAuthenticated && (
            <div className="flex flex-row gap-4">
              <button
                className=" flex flex-col-reverse gap-1 items-center justify-center mb-0 text-green-600  dark:text-green-500 md:w-16 md:h-16 xl:w-20 xl:h-20   hover:scale-105"
                type="button "
                onClick={handleThemeSwitch}
              >
                {isDark ? (
                  <>
                    {" "}
                    <span className="text-base ">Light</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="xl:w-8 xl:h-8    "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>{" "}
                  </>
                ) : (
                  <>
                    <span className="text-base ">Dark</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8  text-gray-700 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </>
                )}
              </button>

              <button
                className="  hover:scale-105 font-light text-3xl text-green-600 dark:text-green-500 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <Link to="/login">Login</Link>
              </button>
              <button
                onClick={handleRegisterClick}
                className="hover:scale-105 font-light text-2xl text-green-600 dark:text-green-500 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex  text-xl  w-full justify-center items-center gap-4 py-2 ">
              <button
                className=" flex flex-col-reverse gap-1 items-center justify-center mb-0 text-green-600  dark:text-green-500 w-20 h-20   hover:scale-105"
                type="button "
                onClick={handleThemeSwitch}
              >
                {isDark ? (
                  <>
                    {" "}
                    <span className="text-base ">Light</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8    "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>{" "}
                  </>
                ) : (
                  <>
                    <span className="text-base ">Dark</span>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8  text-gray-700 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  </>
                )}
              </button>
              <div className="text-green-600    dark:text-green-500 mb-1 text-base  ">
                <UserCircleIcon className="lg:h-11 lg:w-11 md:h-9 md:w-9 text-gray-700" />
                {authStore.isAuthenticated()
                  ? authStore.user.username
                  : "Anonymous"}
              </div>
              <button
                onClick={(evt) => authStore.logout()}
                className=" flex  flex-col  justify-center  text-base  mb-0 gap-1 text-green-600 dark:text-green-500 focus:outline-none focus:shadow-outline hover:scale-105"
                type="button"
              >
                <svg
                  className=" lg:h-9 lg:w-9 md:h-9 md:w-9 text-gray-700"
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
                <p className=" ">Logout</p>
              </button>
            </div>
          )}
        </div>
        <button
          className="md:hidden flex flex-col-reverse gap-1 items-center justify-center mb-0 text-green-600  dark:text-green-500 w-20 h-20   hover:scale-105"
          type="button "
          onClick={handleThemeSwitch}
        >
          {isDark ? (
            <>
              {" "}
              <span className="text-base ">Light</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6    "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>{" "}
            </>
          ) : (
            <>
              <span className="text-base ">Dark</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-gray-700 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </>
          )}
        </button>
        <div className="flex items-center  justify-center m-0 text-4xl text-green-600 dark:text-green-500 cursor-pointer burger-icon md:hidden">
          <ion-icon onClick={(evt) => onToggleMenu(evt)} name="menu"></ion-icon>
        </div>
      </div>
      <Outlet />
      <div
        className={`mobile-nav flex flex-col px-4 pt-24 lg:pt-36 gap-1  border-b absolute bg-gray-100 w-screen ${
          mobileNav ? "block" : "hidden"
        }`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <ul className=" list-disc text-left  gap-4 grid grid-cols-2  border-b">
          <li className="  font-light text-xl text-green-600 dark:text-green-500 hover:text-gray-600">
            <Link to="/e-vehicles">E-Fahrzeuge</Link>
          </li>
          <li className="  font-light text-xl text-green-600 dark:text-green-500 hover:text-gray-600">
            <Link to="/reservation-view">Reservierungen</Link>
          </li>
          <li className=" font-light text-xl text-green-600 dark:text-green-500 hover:text-gray-600">
            <Link to="/contact">Kontakt</Link>
          </li>
          <li className=" font-light text-xl text-green-600 dark:text-green-500 hover:text-gray-600">
            <Link to="/About-us">Über uns</Link>
          </li>
        </ul>

        {!isAuthenticated && (
          <div className="flex justify-center items-center gap-20 p-2  ">
            <button
              className=" font-light text-2xl text-green-600 dark:text-green-500 focus:outline-none focus:shadow-outline"
              type="button"
            >
              <Link to="/login">Login</Link>
            </button>
            <button
              className=" font-light text-2xl text-green-600 dark:text-green-500 focus:outline-none focus:shadow-outline"
              type="button"
            >
              <Link to="/register">register</Link>
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex flex-row gap-20 ">
            <div className=" flex   flex-col text-gray-600">
              <UserCircleIcon className="h-8 w-8   text-green-600 dark:text-green-500" />
              {authStore.isAuthenticated()
                ? authStore.user.fullname
                : "Anonymous"}

              <button
                onClick={(evt) => authStore.logout()}
                className=" text-2xl text-green-600 dark:text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
