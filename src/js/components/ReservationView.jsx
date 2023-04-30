import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const { vehicleId } = useParams(); // Extrahiere die Fahrzeug-ID aus der URL
  const userId = "yourUserId"; // Ersetzen Sie dies durch die Benutzer-ID des angemeldeten Benutzers

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

      // Fetch vehicle details for each reservation
      Promise.all(
        fetchedReservations.map((reservation) =>
          fetchVehicleDetails(reservation.vehicleId)
        )
      ).then((fetchedVehicles) => {
        setVehicles(fetchedVehicles);
      });
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
  
  return (
    <div className="p-6" >
      <h1 style={{
        backgroundImage: "url('public/images/Design ohne Titel.png')",
        backgroundPosition: "center",
        backgroundSize: "center",
        backgroundRepeat: "no-repeat"
      }} className="text-4xl font-normal text-white mb-6">Meine Reservierungen</h1>
      <ul className="-space-y-0 flex flex-row flex-wrap">
        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          const isActive = isActiveReservation(reservation);
          const bgColor = isActive ? 'bg-green-500' : 'bg-red-400';
          return (
            <li key={reservation.id} className={`border border-gray-300 p-4 text-white rounded-md w-96 ${bgColor}`}>
    <h2 className="text-xl font-bold mb-2">{reservation.vehicle}</h2>

    <p>Reservierung von: {reservation.startDate}</p>
    <p>Reservierung bis: {reservation.reservedUntil}</p>
    {/* Add more reservation details if needed */}

    <button
      className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => deleteReservation(reservation._id)}
    >
      Reservierung löschen
    </button>
  </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReservationView;