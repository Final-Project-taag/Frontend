import { Link, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { User } from "react-feather";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const isAuthenticated = authStore.isAuthenticated(); // Add this line to check authentication status
  const loadUser = authStore.loadUser;
  const handleRegisterClick = () => {
    navigate("/register");
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="fixed z-60  h-24  bg-white  flex border-b justify-center items-center ">
      <div className="  w-screen flex justify-center py-1 px-1 ">
        <div className="flex  ">
          <Link to="/">
            {" "}
            <button className=" py-1 px-1 " type="button">
              <img
                src="/logo-tranparint.webp"
                className=" h-16 w-16 text-gray-700"
              />
            </button>
          </Link>
        </div>

        <div className="flex justify-center  items-center">
          <ul className="flex justify-center items-center gap-5 ">
            <li className=" font text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
              <Link to="/e-vehicles">E-Fahrzeuge</Link>
            </li>
            {isAuthenticated && (
              <li className=" font text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
                <Link to={"/reservation-view/buchungen"}>Buchungen</Link>
              </li>
            )}

            <li className=" font text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className=" font text-2xl text-green-600 hover:text-gray-600 hover:scale-105">
              <Link to="/About-us">Über uns</Link>
            </li>
          </ul>
        </div>

        <div className=" flex items-center justify-center">
          {!isAuthenticated && (
            <div className="flex flex-row gap-4">
              <button
                className=" font-light text-2xl text-green-600 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline hover:scale-105"
                type="button"
              >
                <Link to="/login">Login</Link>
              </button>
              <button
                onClick={handleRegisterClick}
                className="font-light text-2xl text-green-600 hover:text-gray-600 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline hover:scale-105"
                type="button"
              >
                Register
              </button>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex flex-row gap-2 justify-between ">
              <div>
                <UserCircleIcon className="h-12 w-10 text-gray-700" />
                {authStore.isAuthenticated()
                  ? authStore.user.username
                  : "Anonymous"}
              </div>

              <button
                onClick={(evt) => authStore.logout()}
                className="flex items-center  gap-1 text-green-500 focus:outline-none focus:shadow-outline hover:scale-105"
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
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
