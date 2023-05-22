import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8081/reservations", { headers: { Authorization: `Bearer ${token}` } });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  
  return (
    <div className='pt-20'>
      <h1>Alle Reservierungen</h1>
      <table>
        <thead>
          <tr>
            <th>Reservierungs-ID</th>
            <th>Fahrzeug-ID</th>
            <th>Benutzer-ID</th>
            <th>Anfangsdatum</th>
            <th>Enddatum</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation._id}</td>
              <td>{reservation.vehicle._id}</td>
              <td>{reservation.user}</td>
              <td>{new Date(reservation.startDate).toLocaleString()}</td>
              <td>{new Date(reservation.endDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReservations;
