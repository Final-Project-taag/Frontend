import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../hooks/useAuthStore";

export default function EfahrzeueModal({
  imageUrls,
  name,
  type,
  driveRange,
  price,
  chargingTime,
  vehicleId,
  quantity,
  closeModle,
}) {
  const [reservation, setReservation] = useState([]);
  const [authError, setAuthError] = useState(false);
 
  const [startDate, setStartDate] = useState(null);
 
  const [timeLeft, setTimeLeft] = useState(null);
  const [isReserved, setIsReserved] = useState(false);

  const authStore = useAuthStore();

  const isAuthenticated = authStore.isAuthenticated(); // Add this line to check authentication status

  const navigate = useNavigate();
  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (isReserved) {
      const endTime = new Date(Date.now() + 60 * 60 * 1000);
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime();
        setTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(timer);
          setIsReserved(false);
          setTimeLeft(null);
        }
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isReserved]);

  // Funktion zur Berechnung des Startdatums
  const calculateStartDate = (price) => {
    return new Date(Date.now() + price * 60 * 60 * 1000);
  };

  // Funktion zur Aktualisierung des Startdatums
  const handleStartDateChange = (event) => {
    const hoursFromNow = parseInt(event.target.value, 10);
    setStartDate(calculateStartDate(price));
  };
  // Funktion zur Aktualisierung der Dauer
  const handleDurationChange = (event) => {
    const durationInHours = parseInt(event.target.value, 10);
    setEndDate(
      new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000)
    );
  };
  // Funktion zur Berechnung des Gesamtpreises
  // Funktion zur Berechnung des Gesamtpreises
  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const durationInHours = (endDate - startDate) / (60 * 60 * 1000);
      return durationInHours * price;
    }
    return 0;
  };
  // ------------------------------------------------RESERVIERUNG--------------------------------------------//
  const handleReservation = async () => {
    if (!isAuthenticated) {
      setAuthError(true);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      navigate("/auth/login"); // Weiterleitung zur Login-Seite
      return;
    }

    if (quantity === 0) {
      alert("Keine Fahrzeuge verfügbar.");
      return;
    }

    const startDate = new Date();

    const reservationDuration = 60 * 60 * 1000; // 1 Stunde in Millisekunden
    const reservedUntil = new Date(Date.now() + reservationDuration);
    const endDate = reservedUntil;

    try {
      const response = await fetch("http://localhost:8081/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId,
          startDate,
          endDate,
          createdAt: new Date(),
          reserved: true,
          reservedUntil,
        }),
      });
      if (!response.ok) {
        throw new Error("Fehler bei der Reservierung");
      }

      const newReservation = await response.json();
      setIsReserved(true);
      setReservation(newReservation);
      setTimeout(() => setIsReserved(false), reservationDuration);
    } catch (error) {
      console.error("Fehler bei der Reservierung: ", error);
      alert("Fehler bei der Reservierung. Bitte versuchen Sie es erneut.");
    }
  };
  const deleteReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      const response = await axios.delete(
        `http://localhost:8081/reservations/${reservationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsReserved(false);
        setTimeLeft(null);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  function goToBooking(vehicleId) {
    navigate(`/reservation-view/${vehicleId}`);
  }
  function goToLogin() {
    setAuthError(false);
    navigate("/login");
  }
  function goToRegister() {
    setAuthError(false);
    navigate("/register");
  }

  return (
    <div className="h-max w-screen bg-white/80 fixed  top-24 left-0 z-50 flex  flex-col justify-center items-center pb-52  ">
      <div className="relative border-green-400 border-2 w-3/4 h-3/4 flex flex-row bg-white rounded-lg shadow m-10">
        <div className="  overflow-hidden	 w-1/2 items-center   p-2 ">
          <img
            className="rounded-l-lg h-auto pt-10 object-cover"
            src={imageUrls}
            alt=""
          />
        </div>
        <div className="my-4   border-x border-gray-300 "></div>
        <div className="  w-1/2 p-4  ">
          <button
            onClick={() => closeModle()}
            type="button"
            className="text-gray-500  w-full border-b-2  border-gray-300 hover:text-gray-900  p-1.5 "
            data-modal-hide="defaultModal"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 right-0 mr-0 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="right-0 sr-only"> Close modal</span>
          </button>

          <div className=" flex flex-col bg-white pt-24 w-3/4 max-h-full  ">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-gray-500 font-medium text-white">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    Model:
                  </th>
                  <th colSpan="2" className=" px-6 py-4">
                    {name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4">Reichweite:</td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {driveRange} KM/H
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4 ">Ladezeit</td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {chargingTime} St
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4"> Preis </td>
                  <td colSpan="2" className="whitespace-nowrap  px-6 py-4">
                    {" "}
                    {price} €
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4">
                    Verfügbare Menge:
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">{quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* reservation button  */}
          <div className=" py-2  flex items-center justify-center pt-10">
            <button
              type="button"
              className={`inline-block rounded-xl p-2 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0  w-fit m-auto  tracking-wider  mt-14  shadow-md shadow-gray-400     text-white  hover:scale-105 ${
                isReserved
                  ? "bg-red-600  "
                  : "bg-green-500 "
              }`}
              onClick={
                isReserved
                  ? () => deleteReservation(reservation._id)
                  : handleReservation
              }
              disabled={quantity === 0}
            >
              {quantity === 0
                ? "Nicht verfügbar"
                : isReserved
                ? "resirviern störnern"
                : "Reservieren"}
            </button>
            {isReserved && (
              <div className="flex items-center justify-center gap-4 mt-14">
                <span className="text-red-600 ">{timeLeft !== null ? formatTimeLeft(timeLeft) : ""}</span>
                

                <button
                  type="button"
                  className="bg-green-500   inline-block rounded-xl p-2  text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0  w-fit m-auto  tracking-wider   shadow-md shadow-gray-400    text-white  hover:scale-105"
                  onClick={() => {
                    /*  handleBooking(); */
                    goToBooking(vehicleId);
                  }}
                  disabled={quantity === 0}
                >
                  go to booking
                </button>
              </div>
            )}

            {authError && (
              <i className="text-gray-500">
                Anmeldung ist erförderlich!{" "}
                <a className="text-green-500 px-3" onClick={goToLogin}>
                  Login
                </a>
                ,
                <a className="text-green-500 px-3" onClick={goToRegister}>
                  register
                </a>
              </i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


