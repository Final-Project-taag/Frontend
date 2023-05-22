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
    
    <div className="flex h-full justify-center items-center w-full  ">
      <div className=" p-4  rounded-lg  border-2  border-green-400 text-center shadow-xl shadow-gray-400   hover:scale-105 transform transition-all duration-500">
      <h1>Klicken Sie auf den Bild und schauen Sie sich die Details an.</h1>

        <a href="#!">
          <div className="flex  p-4  dark:text-white tems-center justify-between">
            <p>{name}</p>
            <p>{price} €/Stunde</p>
          </div>
          <img
            className="rounded-lg  border-gray-400 border-2  object-fill w-80 md:w-96 md:h-56 h-64"
            src={imageUrls}
            alt=""
          />
        </a>
      </div>
      </div>
     
  );
}
export default Card;
