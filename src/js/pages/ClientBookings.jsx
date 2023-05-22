import React, { useState } from "react";
import axios from "axios";

function ClientBookings() {
  const [vehicleData, setVehicleData] = useState({
    type: "",
    name: "",
    driveRange: "",
    weight: "",
    price: "",
    chargingTime: "",
    quantity: "",
    reserved: false,
    reservedUntil: null,
  });

  const handleChange = (event) => {
    setVehicleData({ ...vehicleData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/vehicles",
        vehicleData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Fahrzeugs:", error);
    }
  };

  return (
    <div className="h-full md:h-[95vh] pt-20 ">
      
    </div>
  );
}

export default ClientBookings;
/*   */
