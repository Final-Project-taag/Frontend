import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  //--inputfelder an/aus---//
  const [showInputs, setShowInputs] = useState(true);
  // Timer von EfahrzeugModal nutzen---------------//
  const location = useLocation();
  const timerValue = location.state ? location.state.timerValue : null;

  // Timer anzeigen in der Form---------------------//
  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (timeLeft) {
      const endTime = new Date(Date.now() + timeLeft);
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime();
        setTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(timer);
          setTimeLeft(null);
        }
      }, 1000);

    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };

  }, [timerValue]);

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
  // Diese Funktion gibt die Reservierungs-ID der aktiven Reservierung zurück, wenn eine vorhanden ist, andernfalls gibt sie null zurück.
  const getActiveReservations = async () => {
    try {
      const token = localStorage.getItem("token"); // Stellen Sie sicher, dass der Token dort gespeichert ist
      const response = await axios.get('http://localhost:8081/reservations/active', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // Die aktiven Reservierungen
    } catch (error) {
      console.error("Fehler beim Abrufen aktiver Reservierungen: ", error);
      return null;
    }
  }


  const handlePayment = async () => {
    // Implementieren Sie die Zahlungslogik hier
    console.log("Zahlung durchgeführt!");

    // Nach erfolgreicher Zahlung die Buchung in der Datenbank speichern
    try {

      const bookingId = await getActiveReservationId();

      if (!bookingId) {
        throw new Error('Keine aktive Reservierung gefunden');
      }
      const user = localStorage.getItem("user"); // Nur ein Beispiel, passen Sie es an Ihre Anwendung an

      const token = localStorage.getItem("token"); // Replace with your token management method
      const bookingData = {
        bookingId,
        user,
        vehicle,
        startDate,
        endDate,
        totalPrice,
      };

      const response = await axios.post('http://localhost:8081/booking', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Buchung erfolgreich: ", response.data);
      setIsBooked(true)
      alert("Buchung erfolgreich!");
    } catch (error) {
      console.error("Fehler bei der Buchung: ", error);
    }
  };


  return (

    <div className="flex flex-col justify-items-start  pt-20 pb-52" >
          <h2>Reservation View</h2>

      <div className="relative  flex flex-row  rounded-lg shadow  m-10">
        

        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          const isActive = isActiveReservation(reservation);
          const bgColor = isActive ? 'bg-green-300' : 'bg-red-300';
          return (
            <div key={reservation._id} className={`p-5  border-green-400 border-2  rounded-lg shadow  ${bgColor}`}>

              <div className="flex  flex-row">
             
                {/* Name und Id Nummer */}
                <div className="p-8 border-2">
                  <h2 className="text-xl font-bold mb-2">{reservation.vehicle.name}</h2>
                  <h5>ID Nummer: {reservation.vehicle._id}</h5>
                </div>
              </div>

              <img src={reservation.vehicle.imageUrls} alt="" />
              <p>Reservation ID: {reservation._id}</p>

              <div className="flex col-span-3 p-5 gap-44">
                <p>Reservierung von: {formatDate(reservation.startDate)}</p>
                <p>Reservierung bis {formatDate(reservation.endDate)}</p>
                <p>Pro Stunde: {reservation.vehicle.price}€</p>
              </div>


              {showInputs && (
                // Ihre Eingabefelder hier 
                <div className="flex flex-row gap-5 p-5">
                  <div>
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
                  </div>


                  <div>
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
                  </div>
                  <div className="w-36 pt-5">
                <button
                  type="button"
                  className="h-10 bg-blue-400 text-white px-4 rounded-md hover:bg-blue-500 transition-colors duration-300 mb-4 block w-full"
                  onClick={() => {
                    if (!startDate || !endDate) {
                      alert("Bitte wählen Sie Startzeit und Dauer aus.");
                      return;
                    }
                    updateReservation(reservation._id, { startDate: startDate.toISOString(), endDate: endDate.toISOString(), reservedUntil: endDate.toISOString()});
                    handlePayment();
                    // Setzt 'showInputs' auf false, wodurch die Eingabefelder ausgeblendet werden
                    setShowInputs(false);
                  }}
                >
                  Buchen
                </button>
              </div>
                <button
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteReservation(reservation._id)}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
                </div>
                
              )
              }
              <div className="p-5 font-bold">
                Gesamtpreis: {totalPrice} €
              </div>


           


            </div>
          );
        })}
      </div >



    </div >
  );
};

export default ReservationView;