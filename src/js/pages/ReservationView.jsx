import React, {useState, useEffect} from "react"
import axios from "axios"
import {useLocation} from "react-router-dom"
import {useParams} from "react-router-dom"
import {fetchVehicleDetails} from "../api/vehiclesApi"
import {fetchReservations, getActiveReservations, deleteReservation, updateReservation} from "../api/reservationApi"
import {isActiveReservation, formatDate, calculateTotalPrice, getActiveReservationId} from "../utils/helper"

import {fetchBookings, deleteBooking} from "../api/bookingApi"
import ReservationCard from "../components/ReservationCard"

const ReservationView = () => {
  const [reservations, setReservations] = useState([])
  const [bookings, setBookings] = useState([])
  const {vehicleId} = useParams() // Extrahiere die Fahrzeug-ID aus der URL

  const [vehicles, setVehicles] = useState([])
  const [vehicle, setVehicle] = useState(null)
  const userId = "yourUserId" // Ersetzen Sie dies durch die Benutzer-ID des angemeldeten Benutzers

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [isBooked, setIsBooked] = useState(false)
  //--inputfelder an/aus---//
  const [showInputs, setShowInputs] = useState(true)
  // Timer von EfahrzeugModal nutzen---------------//
  const location = useLocation()
  const timerValue = location.state ? location.state.timerValue : null

  useEffect(() => {
    let timer

    if (timeLeft) {
      const endTime = new Date(Date.now() + timeLeft)
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime()
        setTimeLeft(diff)
        if (diff <= 0) {
          clearInterval(timer)
          setTimeLeft(null)
        }
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [timerValue])

  const handleShowDetails = () => {
    setShowDetails(true)
  }

  useEffect(() => {
    const vehicleDetails = fetchVehicleDetails(vehicleId)
    setVehicle(vehicleDetails)
  }, [vehicleId])

  useEffect(() => {
    // Fetch reservations from the database for the given userId
    fetchData()
  }, [userId])
  const fetchData = () => {
    fetchReservations(userId).then(fetchedReservations => {
      setReservations(fetchedReservations)
    })
    fetchBookings().then(bookings => {
      setBookings(bookings)
    })
  }
  const handlePayment = async () => {
    // Implementieren Sie die Zahlungslogik hier

    // Nach erfolgreicher Zahlung die Buchung in der Datenbank speichern
    try {
      const bookingId = await getActiveReservationId(reservations)

      if (!bookingId) {
        throw new Error("Keine aktive Reservierung gefunden")
      }
      const user = localStorage.getItem("user") // Nur ein Beispiel, passen Sie es an Ihre Anwendung an

      const token = localStorage.getItem("token") // Replace with your token management method
      const bookingData = {
        bookingId,
        user,
        vehicle,
        startDate,
        endDate,
        totalPrice,
      }

      const response = await axios.post("https://green-projekt.onrender.com/booking", bookingData, {
        headers: {Authorization: `Bearer ${token}`},
      })
      setIsBooked(true)
      alert("Buchung erfolgreich!")
    } catch (error) {
      console.error("Fehler bei der Buchung: ", error)
    }
  }

  return (
    <div className=" flex flex-col md:flex-row justify-start items-start gap-10   h-fit md:min-h-screen px-4  w-full pt-24 pb-24  ">
      <div className="md:w-1/2 ">
        <h2 className="w-full h-14 flex flex-col justify-center items-center rounded-md text-xl text-gray-600 dark:text-gray-300 border-2 border-gray-400">
          Reservations
        </h2>
        {reservations?.length &&
          reservations.map(reservation => <ReservationCard fetchData={fetchData} key={reservation._id} reservation={reservation} />)}
      </div>

      <div className="md:w-1/2">
        <h2 className="w-full h-14 flex text-xl  text-gray-600 dark:text-gray-300 rounded-md flex-col justify-center items-center border-2 border-gray-400">
          Bookings
        </h2>
        {bookings?.length &&
          bookings.map(booking => <ReservationCard fetchData={fetchData} isBooking={true} key={booking._id} reservation={booking} />)}
      </div>
    </div>
  )
}

export default ReservationView
