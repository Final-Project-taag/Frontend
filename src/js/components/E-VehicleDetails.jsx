import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


function Card({ imageUrls, name, type, driveRange, weight, price, chargingTime }) {

  const navigate = useNavigate()

  const handleReservation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      navigate("/auth/login"); // Weiterleitung zur Login-Seite
      return;
    }
    

          const vehicleId = "YOUR_VEHICLE_ID"; // Ersetzen Sie dies durch die entsprechende Fahrzeug-ID
          const startDate = new Date();
          const endDate = new Date();
          endDate.setDate(startDate.getDate() + 3); // Beispiel: Reservierung für 3 Tage
      
          try {
            const response = await axios.post("http://localhost:8081/reservations", {
              vehicleId,
              startDate,
              endDate,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            alert("Reservierung erfolgreich!");
          } catch (error) {
            console.error(error);
            alert("Reservierung fehlgeschlagen.");
          }
        };
      

    return (
        <div className="flex justify-center">
            <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700 hover:scale-110 transform transition-all duration-300">
                <a href="#!">
                <img className="rounded-t-lg" src={imageUrls} alt="" style={{ width: "400px", height: "200px", objectFit: "cover" }} />

                </a>
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Type: {type} <br />
                        Drive Range: {driveRange} km <br />
                        Weight: {weight} kg <br />
                        Price: €{price} <br />
                        Charging Time: {chargingTime} hours
                    </p>
                    <button
                        type="button"
                        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={() => navigate("/auth/login")} // Weiterleitung zur Login-Seite
                    >
                        Reservieren
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Card
