import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './E-VehicleDetails'

import { useParams } from "react-router-dom";

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const { vehicleId } = useParams(); // Extrahiere die Fahrzeug-ID aus der URL

  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const userId = "yourUserId"; // Ersetzen Sie dies durch die Benutzer-ID des angemeldeten Benutzers

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };
  //-------------------------- FORMATdATE------------------------------------------------------------------------//
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const hours = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);

    return `Datum: ${year}-${month}-${day}, Uhrzeit: ${hours}:${minutes}`;
  }

  //-------------------------------------------------------------------------------------------------------------------//

  async function fetchReservations(userId) {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      const response = await axios.get("http://localhost:8081/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
  }

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/vehicles/${vehicleId}` // Verwende die Fahrzeug-ID in der URL
      );
      setVehicle(response.data);
    } catch (error) {
      console.error("Error fetching vehicle details: ", error);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [vehicleId]);



  useEffect(() => {
    // Fetch reservations from the database for the given userId
    fetchReservations(userId).then((fetchedReservations) => {
      setReservations(fetchedReservations);
    });

  }, [userId]);

  const isActiveReservation = (reservation) => {
    const endDate = new Date(reservation.endDate);
    const currentDate = new Date();
    return endDate >= currentDate;
  };

  //------------------------------------Löschen-------------------------------------------------------//
  const deleteReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      await axios.delete(`http://localhost:8081/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((res) => res._id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };
  //-----------------------------------UPDATEN-------------------------------------------------//

  const updateReservation = async (reservationId, updatedReservationData) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      await axios.put(`http://localhost:8081/reservations/${reservationId}`, updatedReservationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedReservations = reservations.map((res) =>
        res._id === reservationId ? { ...res, ...updatedReservationData } : res
      );
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };


  // Funktion zur Berechnung des Startdatums
  const calculateStartDate = (price) => {
    return new Date(Date.now() + vehicle.price * 60 * 60 * 1000);
  };

  // Funktion zur Aktualisierung des Startdatums
  const handleStartDateChange = (event) => {
    const hoursFromNow = parseInt(event.target.value, 10);
    setStartDate(calculateStartDate(price));
  };

  // Funktion zur Aktualisierung der Dauer
  const handleDurationChange = (event) => {
    if (!startDate) {
      alert("Bitte wählen Sie zuerst die Startzeit aus.");
      return;
    }
    const durationInHours = parseInt(event.target.value, 10);
    setEndDate(new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000));
  };

  // Funktion zur Berechnung des Gesamtpreises
  const calculateTotalPrice = (startDate, endDate, price) => {
    if (startDate && endDate) {
      const durationInHours = (endDate - startDate) / (60 * 60 * 1000);
      return durationInHours * price;
    }
    return;
  };
  //---------------------------------------Submit Button Funktion für Zahlung--------------------

  // Diese Funktion gibt die Reservierungs-ID der aktiven Reservierung zurück, wenn eine vorhanden ist, andernfalls gibt sie null zurück.
  const getActiveReservationId = () => {
    const activeReservations = reservations.filter((reservation) => isActiveReservation(reservation));

    if (activeReservations.length > 0) {
      return activeReservations[0]._id;
    }

    return null;
  };
  const handlePayment = () => {
    // Implementieren Sie die Zahlungslogik hier
    console.log("Zahlung durchgeführt!");
  };




  return (
    <div className="flex h-[95vh] flex-col justify-center items-center w-full pt-20 " >

      <div className="">

        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          const isActive = isActiveReservation(reservation);
          const bgColor = isActive ? 'bg-green-500' : 'bg-red-400';
          return (
            <div key={reservation._id} className={`border border-gray-300 p-4 text-white rounded-md w-full ${bgColor}`}>

              <div className="flex flex-row">
                <button
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteReservation(reservation._id)}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold mb-2">{reservation.vehicle.name}</h2>

              </div>

              <img src={reservation.vehicle.imageUrls[0]} alt="" />
              <p>Reservation ID: {reservation._id}</p>
              <p>Pro Stunde: {reservation.vehicle.price}€</p>



              <div className="flex flex-col">
                <label htmlFor="start-date" className="font-bold mb-1">
                  Buchung von:
                </label>
                <select
                  id="start-date"
                  className="p-2 w-96 border border-gray-600 rounded-md bg-white text-black"
                  onChange={(e) => {
                    const startDate = new Date(Date.now() + parseInt(e.target.value) * 60 * 60 * 1000);
                    setStartDate(startDate);
                  }}
                >
                  <option value="">Wähle Startzeit</option>
                  {[...Array(10).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      In {i + 1} Stunde(n)
                    </option>
                  ))}
                </select>


                <label htmlFor="duration" className=" font-bold mb-1">
                  Dauer:
                </label>
                <select
                  id="duration"
                  className="p-2 w-96 border border-gray-600 rounded-md bg-white text-black"
                  onChange={(e) => {
                    const endDate = new Date(startDate.getTime() + parseInt(e.target.value) * 60 * 60 * 1000);
                    setEndDate(endDate);
                    setTotalPrice(calculateTotalPrice(startDate, endDate, reservation.vehicle.price));

                  }}

                >
                  <option value="">Wähle Dauer</option>
                  {[...Array(24).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} Stunde(n)
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="h-10 bg-blue-400 text-white px-4 rounded-md hover:bg-blue-500 transition-colors duration-300 mb-4 block w-full"
                  onClick={() => {
                    if (!startDate || !endDate) {
                      alert("Bitte wählen Sie Startzeit und Dauer aus.");
                      return;
                    }
                    updateReservation(reservation._id, { startDate: startDate.toISOString(), endDate: endDate.toISOString(), reservedUntil: endDate.toISOString() });
                  }}
                >
                  Buchen
                </button>

                <div className="font-bold">
                  Gesamtpreis: {totalPrice} €
                </div>
              </div>
              <div className="w-36 pt-5">
                {/* <button
                  type="submit"
                  className=" h-10 bg-green-400 text-white px-4 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4 block w-full"
                  onClick={() => {
                    if (!startDate || !endDate) {
                      alert("Bitte wählen Sie Startzeit und Dauer aus.");
                      return;
                    }
                    handlePayment();
                  }}
                >
                  Submit
                </button> */}
              </div>


            </div>
          );
        })}
      </div>



    </div>
  );
};

export default ReservationView;