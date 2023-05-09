import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Card({
  imageUrls,
  name,
  type,
  driveRange,
  price,
  chargingTime,
  vehicleId,
  quantity,
}) {
  //  Zustand des Detailbereichs zu verwalten:
  const [showDetails, setShowDetails] = useState(false);

  const [vehicle, setVehicle] = useState(null);


  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await axios.get(
          `http://localhost:8081/vehicles/${vehicleId}`
        ); // Ändern Sie hier die URL, um die Fahrzeugdetails abzurufen
        if (response.status === 200) {
          setVehicle(response.data);
        }
      } catch (error) {
        console.error(
          "Error fetching vehicle:",
          error.response ? error.response.data : error
        );
      }
    }

    fetchVehicle();
  }, [vehicleId]);

  return (
    <div className="flex  justify-center items-center w-full  ">
      <div className=" p-4  rounded-lg  border-2  border-green-400 text-center shadow-xl shadow-gray-400   hover:scale-105 transform transition-all duration-500">
        <a href="#!">
          <div className="flex  p-4  items-center justify-between">
            <p>{name}</p>
            <p>{price} €/Stunde</p>
          </div>
          <img
            className="rounded-lg  border-gray-400 border-2  object-fill w-96 h-72"
            src={imageUrls}
            alt=""
          />
        </a>
      </div>

      <div className=" h-28">
        {showDetails && (
          <div className="mt-6 " style={{ zIndex: 1000, position: "relative" }}>
            <div className="flex flex-col gap-36 border-8 border-black bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%p-6 rounded-md shadow-lg  mx-auto">
              <div className="flex flex-col">
                <label htmlFor="start-date" className="font-bold mb-1">
                  Buchung von:
                </label>
                <select
                  id="start-date"
                  className="p-2 w-96 border border-gray-400 rounded-md"
                  onChange={(e) => {
                    const startDate = new Date(
                      Date.now() + parseInt(e.target.value) * 60 * 60 * 1000
                    );
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
                    const endDate = new Date(
                      startDate.getTime() +
                        parseInt(e.target.value) * 60 * 60 * 1000
                    );
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
                    // Führe hier die erforderlichen Aktionen für die Reservierung aus
                  }}
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
      </div>
    </div>
  );
}
export default Card;
