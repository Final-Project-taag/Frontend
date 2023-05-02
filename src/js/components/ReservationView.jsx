// ReservationView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ReservationView = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  async function fetchReservations(userId) {
    try {
      const token = localStorage.getItem('token'); // Replace with your token management method
      const response = await axios.get('http://localhost:8081/reservations', { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  } 

  async function fetchVehicleDetails(vehicleId) {
    try {
      const response = await axios.get(`http://localhost:8081/vehicles/${vehicleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      return null;
    }
  }


  
  useEffect(() => {
    // Fetch reservations from the database for the given userId
    fetchReservations(userId).then((fetchedReservations) => {
      setReservations(fetchedReservations);

      // Fetch vehicle details for each reservation
      Promise.all(fetchedReservations.map((reservation) => fetchVehicleDetails(reservation.vehicleId)))
        .then((fetchedVehicles) => {
          setVehicles(fetchedVehicles);
        });
    });
  }, [userId]);

  return (
    <div className="p-6 mt-16" style={{
      backgroundImage: "url('public/images/bg für Login.jpg')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}>
      <h1 className="text-4xl font-normal text-white mb-6">Meine Reservierungen</h1>
      <ul className="space-y-4">
        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          return (
            <li key={reservation.id} className="border border-gray-300 p-4 bg-gray-700 text-white rounded-md w-96">
              <h2 className="text-xl font-bold mb-2">{vehicle ? reservation.name : 'Loading...'}</h2>
              <p>Reservierung von: {reservation.startDate}</p>
              <p>Reservierung bis: {reservation.endDate}</p>
              {/* Add more reservation details if needed */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default ReservationView;
