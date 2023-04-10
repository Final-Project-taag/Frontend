/* import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";



  function Booking() {
    const navigate = useNavigate();
    const selectedVehicle = navigate.car
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reservationType, setReservationType] = useState("electricCar");
  
  
  
  function handleReservationTypeChange(e) {
    setReservationType(e.target.value);
  }
//handleSubmit-Funktion, um eine Reservierung zu erstellen und sie an das Backend zu senden:
  async function handleSubmit(e) {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      return;
    }
  
    const vehicleId = selectedVehicle._id;
  
    try {
      const response = await axios.post(
        "http://localhost:8081/reservations",
        {
          vehicleId,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Reservierung erfolgreich!");
    } catch (error) {
      console.error(error);
      alert("Reservierung fehlgeschlagen.");
    }
  }
  

  return (
    
    <div className="flex flex-col items-center justify-center min-h bg-gray-100 ">
      <h1 className="text-3xl font-bold mb-8">Rental Car Reservation System</h1>
      <form className="flex flex-col gap-2 bg-white p-5 rounded-md" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="start-date" className="font-bold">
            Start Date and Time:
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="end-date" className="font-bold">
            End Date and Time:
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="reservation-type" className="font-bold">
            Reservation Type:
          </label>
          <select
            id="reservation-type"
            value={reservationType}
            onChange={handleReservationTypeChange}
            className="p-2 border bg-white rounded-md"
          >
            <option value="electricCar">Electric Car</option>
            <option value="eScooter">E-Scooter</option>
            <option value="eBike">E-Bike</option>
          </select>
        </div>
        <div className="">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4 block w-full"
        >
          Submit
        </button>
        </div>
      </form>
// ausgewählte Fahrzeugkarte in der Booking-Komponente anzeigen
      <h2 className="text-2xl font-bold mb-4">Selected Vehicle</h2>
    <Card
      imageUrls={selectedVehicle.imageUrls}
      name={selectedVehicle.name}
      type={selectedVehicle.type}
      driveRange={selectedVehicle.driveRange}
      weight={selectedVehicle.weight}
      price={selectedVehicle.price}
      chargingTime={selectedVehicle.chargingTime}
    />


    </div>
  );
}

export default Booking;


 */
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "./E-VehicleDetails";
import CardGrid from "./E-Vehicles";


function Booking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const navigate = useNavigate();
  const { vehicleId } = useParams();

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await axios.get(`http://localhost:8081/vehicles/${vehicleId}`);
        if (response.status === 200) {
          setVehicle(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    }
    
    fetchVehicle();
  }, [vehicleId]);

 async function handleSubmit(e) {
    e.preventDefault();
    // Handle reservation submission and navigate back to the vehicle list
    navigate("/vehicles");
  
 //handleSubmit-Funktion, um eine Reservierung zu erstellen und sie an das Backend zu senden:
/* async function handleSubmit(e) {
  e.preventDefault();
 */
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
    return;
  }
  navigate("/vehicles");
  const vehicleId = setVehicle._id;
console.log(vehicleId);
  try {
    const response = await axios.post(
      "http://localhost:8081/reservations",
      {
        vehicleId,
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Reservierung erfolgreich!");
  } catch (error) {
    console.error(error);
    alert("Reservierung fehlgeschlagen.");
  }
}

 
  return (
    <div className="flex flex-col items-center justify-center min-h bg-gray-100 ">
      <h1 className="text-3xl font-bold mb-8">Rental Car Reservation System</h1>
      {vehicle && (
        <div>
          <h2>{vehicle.name}</h2>
          <img src={vehicle.imageUrl} alt={vehicle.name} />
          {/* Display more vehicle details if needed */}
        </div>
      )}
      <form className="flex flex-col gap-2 bg-white p-5 rounded-md" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="start-date" className="font-bold">
            Start Date and Time:
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="end-date" className="font-bold">
            End Date and Time:
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        {/*  <div className="flex flex-col mb-4">
          <label htmlFor="reservation-type" className="font-bold">
            Reservation Type:
          </label>
          <select
            id="reservation-type"
            value={reservationType}
            onChange={handleReservationTypeChange}
            className="p-2 border bg-white rounded-md"
          >
            <option value="electricCar">Electric Car</option>
            <option value="eScooter">E-Scooter</option>
            <option value="eBike">E-Bike</option>
          </select>
        </div>  */}
        <div className="">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4 block w-full"
        >
          Submit
        </button>
        </div>
      </form>

      // ausgewählte Fahrzeugkarte in der Booking-Komponente anzeigen
      <h2 className="text-2xl font-bold mb-4">Selected Vehicle</h2>
    <Card
      imageUrls={setVehicle.imageUrls}
      name={setVehicle.name}
      type={setVehicle.type}
      driveRange={setVehicle.driveRange}
      weight={setVehicle.weight}
      price={setVehicle.price}
      chargingTime={setVehicle.chargingTime}
    />



    </div>
  );
}

export default Booking;
