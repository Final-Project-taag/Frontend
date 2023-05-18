import React, { useState } from 'react';
import axios from 'axios';

function AdminAdd() {
  const [vehicleData, setVehicleData] = useState({
    type: '',
    name: '',
    driveRange: '',
    weight: '',
    price: '',
    chargingTime: '',
    quantity: '',
    reserved: false,
    reservedUntil: null,
  });

  const handleChange = (event) => {
    setVehicleData({ ...vehicleData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/vehicles', vehicleData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Fahrzeugs:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" name="type" onChange={handleChange} required />
      </label>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} required />
      </label>
      <label>
        Drive Range:
        <input type="number" name="driveRange" onChange={handleChange} required />
      </label>
      <label>
        Weight:
        <input type="number" name="weight" onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" onChange={handleChange} required />
      </label>
      <label>
        Charging Time:
        <input type="number" name="chargingTime" onChange={handleChange} required />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" onChange={handleChange} required />
      </label>
      <button type="submit">Add Vehicle</button>
    </form>
  );
}
/* In diesem Code erstellen wir ein Formular mit Feldern für jede Eigenschaft eines Fahrzeugs. Jedes Mal, wenn ein Feld geändert wird, 
aktualisieren wir den entsprechenden Zustand mit dem Wert des Felds. Wenn das Formular eingereicht wird, verwenden wir Axios,
 um eine POST-Anforderung an unseren Server zu senden, um das neue Fahrzeug hinzuzufügen.
 */
export default AdminAdd;
