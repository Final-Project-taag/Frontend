import React from "react";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Booking() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicle, setVehicle] = useState("");
  const vehicleId = useParams()
const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle reservation submission and navigate back to the vehicle list

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
      navigate('/reservation-view'); // Redirect to the reservation-view page
    } 
     
    catch (error) {
      console.error(error);
      alert("Reservierung fehlgeschlagen.");
    }
  }
/*    navigate('/reservation-view')
 */   // Fetch vehicle data when the component is mounted
  useEffect(() => {

    async function fetchVehicle() {

      try {
        const response = await axios.get(`http://localhost:8081/vehicles/${vehicleId}`); // Ändern Sie hier die URL, um die Fahrzeugdetails abzurufen
        if (response.status === 200) {
          setVehicle(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error.response ? error.response.data : error);
      }
    }

    fetchVehicle();
    
  }, [vehicleId]);



  return (
    <div className="flex flex-col min-h-screen bg-white  mx-12 mt-5 border border-solid border-stone-800 rounded-md">
      <h1 className="bg-gray-600 text-green-400 text-center text-4xl py-4 font-bold mb-10 rounded-md">GreenWheels Reservierung</h1>
      <form className="flex flex-row gap-4 bg-white p-6 rounded-md shadow-lg border-2 border-solid border-black w-5/6 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="start-date" className="font-bold mb-1">
            Buchung von:
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 w-96 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="font-bold mb-1">
            Buchung bis:
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 w-96 border border-gray-400 rounded-md"
          />
        </div>
        <div className="w-36 pt-5">
          <button
            type="submit"
            className=" h-10 bg-green-400 text-white px-4 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4 block w-full"
          >
            Submit
          </button>
        </div>
      </form>
      {vehicle && (
        <div className="flex flex-row text-lg mt-10">
          <div className="flex flex-row">
            <img className="w-2/5 border-solid border-4 border-stone-600 rounded-md" src={vehicle.imageUrls} alt={vehicle.name} />
            <table className="table-fixed w-1/3 ml-6">
              <thead>
                <tr>
                  <td className="text-xl font-bold pb-2">{vehicle._id}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold">Reichweite:</td>
                  <td>{vehicle.driveRange} KM</td>
                </tr>
                <tr>
                  <td className="font-bold">Gewicht:</td>
                  <td>{vehicle.weight} KG</td>
                </tr>
                <tr>
                  <td className="font-bold">Preis:</td>
                  <td>{vehicle.price} €</td>
                </tr>
                <tr>
                  <td className="font-bold">Ladezeit:</td>
                  <td>{vehicle.chargingTime} St.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
      }
  export default Booking;


       



