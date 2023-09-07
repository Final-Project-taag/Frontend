import {useState, useEffect} from "react"
import React from "react"
import {useNavigate, Link} from "react-router-dom"
import axios from "axios"
import useAuthStore from "../hooks/useAuthStore"
import DateTimePicker from "react-datetime-picker"
import {calculateTotalPrice, generateDate} from "../utils/helper"

export default function EfahrzeueModal({imageUrls, name, type, driveRange, price, chargingTime, vehicleId, quantity, closeModle}) {
  const [reservation, setReservation] = useState([])
  const [authError, setAuthError] = useState(false)
  const [startDate, setStartDate] = useState(generateDate(new Date(), 1))
  const [endDate, setEndDate] = useState(generateDate(new Date(), 2))

  const [timeLeft, setTimeLeft] = useState(null)
  const [isReserved, setIsReserved] = useState(false)

  const authStore = useAuthStore()

  const isAuthenticated = authStore.isAuthenticated() // Add this line to check authentication status

  const navigate = useNavigate()
  const formatTimeLeft = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    let timer

    if (isReserved) {
      const endTime = new Date(Date.now() + 60 * 60 * 1000)
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime()
        setTimeLeft(diff)
        if (diff <= 0) {
          clearInterval(timer)
          setIsReserved(false)
          setTimeLeft(null)
        }
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isReserved])

  // Funktion zur Berechnung des Startdatums
  const calculateStartDate = price => {
    return new Date(Date.now() + price * 60 * 60 * 1000)
  }

  // Funktion zur Aktualisierung des Startdatums
  const handleStartDateChange = event => {
    const hoursFromNow = parseInt(event.target.value, 10)
    setStartDate(calculateStartDate(price))
  }
  // Funktion zur Aktualisierung der Dauer
  const handleDurationChange = event => {
    const durationInHours = parseInt(event.target.value, 10)
    setEndDate(new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000))
  }
  // Funktion zur Berechnung des Gesamtpreises
  // Funktion zur Berechnung des Gesamtpreises

  // ------------------------------------------------RESERVIERUNG--------------------------------------------//
  const handleReservation = async () => {
    if (!isAuthenticated) {
      setAuthError(true)
      return
    }
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.")
      navigate("/auth/login") // Weiterleitung zur Login-Seite
      return
    }

    if (quantity === 0) {
      alert("Keine Fahrzeuge verfügbar.")
      return
    }
    try {
      const response = await fetch("https://green-wheels-backend.onrender.com/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId,
          startDate,
          endDate,
        }),
      })
      if (!response.ok) {
        throw new Error("Fehler bei der Reservierung")
      }

      const newReservation = await response.json()
      setIsReserved(true)
      setReservation(newReservation)
    } catch (error) {
      console.error("Fehler bei der Reservierung: ", error)
      alert("Fehler bei der Reservierung. Bitte versuchen Sie es erneut.")
    }
  }
  const deleteReservation = async reservationId => {
    try {
      const token = localStorage.getItem("token") // Replace with your token management method
      const response = await axios.delete(`https://green-wheels-backend.onrender.com/reservations/${reservationId}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      if (response.status === 200) {
        setIsReserved(false)
        setTimeLeft(null)
      }
    } catch (error) {
      console.error("Error deleting reservation:", error)
    }
  }

  function goToBooking(vehicleId) {
    navigate(`/reservation-view`)
  }
  function goToLogin() {
    setAuthError(false)
    navigate("/login")
  }
  function goToRegister() {
    setAuthError(false)
    navigate("/register")
  }

  return (
    <div className="h-screen w-screen bg-white/80 fixed  top-2 md:top-20  pb-20 left-0 z-50 flex  flex-col justify-center items-center   ">
      <div className="relative border-green-400 border-2 w-11/12 lg:w-3/4  md:h-3/4 flex flex-col lg:flex-row bg-gray-100 dark:bg-slate-800 rounded-lg shadow mt-0 md:pb-[120px] lg:pb-[80px] pb-0  ">
        <div className=" hidden  md:inline-block  w-full lg:w-1/2 items-center  p-2  lg:order-1">
          <img className="rounded-md h-full w-full md:pt-0 object-cover max-h-[190px] md:max-h-[250px] lg:max-h-full" src={imageUrls} alt="" />
        </div>

        <div className="hidden lg:block mt-4 border-x border-gray-300 order-2"></div>

        <div className="w-full  dark:bg-slate-800 lg:w-1/2 p-2 lg:order-3">
          <button
            onClick={() => closeModle()}
            type="button"
            className="text-gray-500  w-full border-b-2  border-gray-300 hover:text-gray-900  p-1.5 "
            data-modal-hide="defaultModal"
          >
            <svg aria-hidden="true" className="w-8 h-8 right-0 mr-0 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="right-0 sr-only"> Close modal</span>
          </button>

          <div className="   md:hidden  w-full lg:w-1/2 items-center  p-2  lg:order-1">
            <img className="rounded-md h-full w-full md:pt-0 object-cover max-h-[190px] md:max-h-[250px] lg:max-h-full" src={imageUrls} alt="" />
          </div>
          <div className="flex flex-col dark:bg-slate-800 bg-gray-100  text-gray-600  dark:text-gray-200 pt-2 md:pt-24 w-full md:w-3/4 max-h-full overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light dark:text-gray-200">
              <thead className="border-b  bg-gray-200 dark:bg-slate-600 font-medium ">
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
                  <td className="whitespace-nowrap  px-6 py-4 ">Ladezeit</td>
                  <td className="whitespace-nowrap  px-6 py-4">{chargingTime} St</td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4"> Preis </td>
                  <td colSpan="2" className="whitespace-nowrap  px-6 py-4">
                    {" "}
                    {price} €
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4">Verfügbare Menge:</td>
                  <td className="whitespace-nowrap  px-6 py-4">{quantity}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between w-full py-2">
              <p>Von: </p>{" "}
              <DateTimePicker
                format="y-MM-dd h a"
                className="mr-6 w-4/5  dark:text-gray-200 bg-gray-100 dark:bg-slate-600  "
                locale="en"
                onChange={setStartDate}
                value={startDate}
              />
            </div>
            <div className="flex justify-between w-full py-2">
              <p>Bis: </p>{" "}
              <DateTimePicker
                format="y-MM-dd h a"
                className="mr-6 w-4/5  dark:text-gray-200 bg-gray-100 dark:bg-slate-600 "
                locale="en"
                onChange={setEndDate}
                value={endDate}
              />
            </div>
            <p>Total Price: {calculateTotalPrice(startDate, endDate, price).toFixed(2)}€</p>
          </div>
        </div>

        <div className="md:absolute static md:left-2/4 left-auto md:bottom-8 bottom-auto md:-translate-x-1/2 py-2 gap-4  flex flex-col lg:flex-row items-center justify-center pt-3 md:pt-10 order-3 pb-6 md:pb-0">
          <button
            type="button"
            className={`inline-block rounded-lg p-2 px-3 text-base font-medium  leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0  w-fit m-auto  tracking-wider  shadow-md dark:shadow-sm shadow-gray-400     text-gray-100  hover:scale-105 ${
              isReserved ? "bg-red-600  " : "bg-green-500 "
            }`}
            onClick={isReserved ? () => deleteReservation(reservation._id) : handleReservation}
            disabled={quantity === 0}
          >
            {quantity === 0 ? "Nicht verfügbar" : isReserved ? "Reservieren Stornieren" : "Reservieren"}
          </button>
          {isReserved && (
            <>
              <span className="text-red-600 ">{timeLeft !== null ? formatTimeLeft(timeLeft) : ""}</span>
              <button
                type="button"
                className="bg-green-500   inline-block rounded-lg p-2 px-3  text-base font-medium  leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0  w-fit m-auto  tracking-wider   shadow-md dark:shadow-sm shadow-gray-400    text-white  hover:scale-105"
                onClick={() => {
                  /*  handleBooking(); */
                  goToBooking(vehicleId)
                }}
                disabled={quantity === 0}
              >
                Zur Buchung
              </button>
            </>
          )}
          {authError && (
            <div className=" text-center p-2">
              <p className="text-gray-500 mt-2 ">
                Anmeldung ist erförderlich!{" "}
                <a className="text-green-500 cursor-pointer px-3" onClick={goToLogin}>
                  Anmelden
                </a>
                ,
                <a className="text-green-500 cursor-pointer px-3" onClick={goToRegister}>
                  registrieren
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* 

 */
