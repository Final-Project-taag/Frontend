import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const { vehicleId } = useParams(); // Extrahiere die Fahrzeug-ID aus der URL

  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const userId = "yourUserId"; // Ersetzen Sie dies durch die Benutzer-ID des angemeldeten Benutzers

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };


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
  }, []);



  useEffect(() => {
    // Fetch reservations from the database for the given userId
    fetchReservations(userId).then((fetchedReservations) => {
      setReservations(fetchedReservations);
    });

  }, [userId]);

  const isActiveReservation = (reservation) => {
    const endDate = new Date(reservation.reservedUntil);
    const currentDate = new Date();
    return endDate >= currentDate;
  };


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
  // Funktion zur Berechnung des Startdatums
  const calculateStartDate = (hoursFromNow) => {
    return new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
  };

  // Funktion zur Aktualisierung des Startdatums
  const handleStartDateChange = (event) => {
    const hoursFromNow = parseInt(event.target.value, 10);
    setStartDate(calculateStartDate(hoursFromNow));
  };

  // Funktion zur Aktualisierung der Dauer
  const handleDurationChange = (event) => {
    const durationInHours = parseInt(event.target.value, 10);
    setEndDate(new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000));
  };

  // Funktion zur Berechnung des Gesamtpreises
  const calculateTotalPrice = () => {
    if (startDate && endDate && vehicle) {
      const durationInHours = (endDate - startDate) / (60 * 60 * 1000);
      return durationInHours * vehicle.price;
    }
    return 0;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [startDate, endDate, vehicle]);

  // -----------------------------------------Zahlungsroute Fetchen------------------------//

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:8081/payment/create-payment", {
        amount: totalPrice,
        description: "Vehicle reservation",
        redirectUrl: "http://localhost:3000/payment-success", // Die URL, zu der der Benutzer nach erfolgreicher Zahlung weitergeleitet wird
        webhookUrl: "http://localhost:8081/webhook", // Die Webhook-URL, die von Mollie aufgerufen wird, um den Status der Zahlung zu aktualisieren
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // Leiten Sie den Benutzer zur Zahlungs-URL weiter
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("An error occurred while creating the payment. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col justify-items-start w-full pt-20 pb-52" >

      <div className="w-1/2">

        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          const isActive = isActiveReservation(reservation);
          const bgColor = isActive ? 'bg-green-500' : 'bg-red-400';
          return (
            <div key={reservation._id} className={`border border-gray-300 p-4 text-white rounded-md w-96 ${bgColor}`}>

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

              <p>Reservierung von: {reservation.startDate}</p>
              <p>Reservierung bis: {reservation.reservedUntil}</p>
              {/* Add more reservation details if needed */}
              <button className="h-10 bg-green-400 text-white px-4 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4 block w-full"
                onClick={() => {
                  handleShowDetails();
                }}>
                  BuchMal.
              </button>

            </div>
          );
        })}
      </div>

      {/* --------------------  Dieser Datei wird geöffnet wenn auf Buchen Button geklickt wird           ----------------------------------------- */}

      {showDetails && (
        <div className="mt-6 " style={{ zIndex: 1000, position: "relative" }}>

          <div className="flex flex-col gap-4 border  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%p-6 rounded-md shadow-lg  mx-auto">
            <div className="flex flex-col">
              <label htmlFor="start-date" className="font-bold mb-1">
                Buchung von:
              </label>
              <select
                id="start-date"
                className="p-2 w-96 border border-gray-400 rounded-md"
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
            <div className="flex flex-col">
              <label htmlFor="duration" className="font-bold mb-1">
                Dauer:
              </label>
              <select
                id="duration"
                className="p-2 w-96 border border-gray-400 rounded-md"
                onChange={(e) => {
                  const endDate = new Date(startDate.getTime() + parseInt(e.target.value) * 60 * 60 * 1000);
                  setEndDate(endDate);
                  setTotalPrice(calculateTotalPrice(startDate, endDate));
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
                type="submit"
                className=" h-10 bg-green-400 text-white px-4 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4 block w-full"
                onClick={() => {
                  if (!startDate || !endDate) {
                    alert("Bitte wählen Sie Startzeit und Dauer aus.");
                    return;
                  }
                  handlePayment();                }}
              >
                Submit
              </button>
            </div>
            <div className="font-bold">
              Gesamtpreis: {totalPrice.toFixed(2)} €
            </div>
          </div>
        </div>
      )}
      <div>
        haha
      </div>
    </div>
  );
};

export default ReservationView;