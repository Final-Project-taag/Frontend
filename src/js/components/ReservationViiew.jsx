import React, { useState } from "react";
import Card from "./Card";

function ReservationView({ location }) {
  const vehicleData = location.state.vehicleData;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Hier können Sie den Reservierungsvorgang verarbeiten und die Daten an den Server senden.
    console.log("Reservierung:", {
      vehicleId: vehicleData.vehicleId,
      startDate,
      endDate,
    });
  };

  return (
    <div>
      <h1>Reservierungsansicht</h1>
      <Card
        imageUrls={vehicleData.imageUrls}
        name={vehicleData.name}
        type={vehicleData.type}
        driveRange={vehicleData.driveRange}
        weight={vehicleData.weight}
        price={vehicleData.price}
        chargingTime={vehicleData.chargingTime}
        vehicleId={vehicleData.vehicleId}
      />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="start-date">Startdatum:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <label htmlFor="end-date">Enddatum:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <br />
        <button type="submit">Reservierung bestätigen</button>
      </form>
    </div>
  );
}

export default ReservationView;
