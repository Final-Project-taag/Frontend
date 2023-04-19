

import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "./E-VehicleDetails";

function Booking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicle, setVehicle] = useState(" ");
  const navigate = useNavigate();
  const { vehicleId } = useParams();


 
  async function handleSubmit(e) {
    e.preventDefault();
    // Handle reservation submission and navigate back to the vehicle list
    

    //handleSubmit-Funktion, um eine Reservierung zu erstellen und sie an das Backend zu senden:
    /* async function handleSubmit(e) {
      e.preventDefault();
     */
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      return;
    }



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
  
  // Fetch vehicle data when the component is mounted
  useEffect(() => {
    console.log(vehicleId);
    async function fetchVehicle() {

      try {
        const response = await axios.get(`http://localhost:8081/vehicles/${vehicleId}`); // Ändern Sie hier die URL, um die Fahrzeugdetails abzurufen
        if (response.status === 200) {
          setVehicle(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    }

    fetchVehicle();
  }, [vehicleId]);





  return (
    <div className="flex flex-col items-center justify-center min-h bg-gray-100 ">
      <h1 className="text-3xl font-bold mb-8">Rental Car Reservation System</h1>
      {vehicle && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Ihren gewünschten E-Fahrzeug : {vehicle.name}</h2>
          <img src={vehicle.imageUrl} alt={vehicle.name} />
          {/* Display more vehicle details if needed */}
        </div>
      )}

      <div className="flex  text-lg ">
        <div className="pr-4">
        {vehicle && (
          <Card 
            imageUrls={vehicle.imageUrls}
            name={vehicle.name}
            type={vehicle.type}
            driveRange={vehicle.driveRange}
            weight={vehicle.weight}
            price={vehicle.price}
            chargingTime={vehicle.chargingTime}
            vehicleId={vehicle._id}
          />
        )}


        </div>



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
              value={{reservationType}}
              onChange={handleReservationTypeChange}
              className="p-2 border bg-white rounded-md"
            >
              <option value="electricCar">Electric Car</option>
              <option value="eScooter">E-Scooter</option>
              <option value="eBike">E-Bike</option>
            </select>
          </div> */}
          <div className="">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4 block w-full"
            >
              Submit
            </button>
          </div>
        </form>




      </div>



    </div>
  );
}

export default Booking;
