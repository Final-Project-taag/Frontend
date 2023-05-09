import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "./E-VehicleDetails";
import EfahrzeueModal from "../features/EfahrzeueModal";

// eine Hilfsfunktion aggregateVehicleData, die die Fahrzeugdaten basierend auf den Fahrzeugmodellen gruppiert:

function aggregateVehicleData(vehicles, vehicleCounts) {
  const aggregatedVehicles = {};

  vehicles.forEach((vehicle) => {
    const vehicleKey = `${vehicle.name}-${vehicle.type}-${vehicle.driveRange}-${vehicle.price}-${vehicle.chargingTime}`;

    if (!aggregatedVehicles[vehicleKey]) {
      aggregatedVehicles[vehicleKey] = {
        ...vehicle,
        count: 0,
        _id: vehicle._id,
      };
    }

    if (vehicleCounts[vehicle._id] !== undefined) {
      aggregatedVehicles[vehicleKey].count += vehicleCounts[vehicle._id];
    }
  });

  return Object.values(aggregatedVehicles);
}

function EVehicles() {
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [carDetails, setCarDetails] = useState({});
  const [cars, setCars] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [minDriveRangeFilter, setMinDriveRangeFilter] = useState("");
  const [maxDriveRangeFilter, setMaxDriveRangeFilter] = useState("");

  const navigate = useNavigate();


  function closeModle () {
    setCarDetails({})
    setShowModal(false)
  }
  async function fetchVehicles() {
    try {
      const queryParams = new URLSearchParams();

      if (typeFilter) {
        queryParams.append("type", typeFilter);
      }
      if (minPriceFilter) {
        queryParams.append("minPrice", minPriceFilter);
      }
      if (maxPriceFilter) {
        queryParams.append("maxPrice", maxPriceFilter);
      }
      if (minDriveRangeFilter) {
        queryParams.append("minDriveRange", minDriveRangeFilter);
      }
      if (maxDriveRangeFilter) {
        queryParams.append("maxDriveRange", maxDriveRangeFilter);
      }

      const response = await axios.get(
        "http://localhost:8081/vehicles?" + queryParams.toString()
      );
      const aggregatedVehicles = aggregateVehicleData(
        response.data,
        vehicleCounts
      );
      setCars(aggregatedVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }
  //Fahrzeugzahlen vom Backend abrufen
  async function fetchVehicleCounts() {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/vehicleCounts"
      );
      // console.log('Fetched vehicle counts:', response.data); // Neue Zeile
      setVehicleCounts(response.data);
    } catch (error) {
      console.error("Error fetching vehicle counts:", error);
    }
  }
  function handleShowModle(carDetails) {
    setCarDetails(carDetails);
    // console.log({carDetails})
    setShowModal(true);
  }
  //console.log(vehicleCounts);

  //console.log(cars);
  useEffect(() => {
    fetchVehicles();
    fetchVehicleCounts();
  }, [
    typeFilter,
    minPriceFilter,
    maxPriceFilter,
    minDriveRangeFilter,
    maxDriveRangeFilter,
  ]);

  return (<>
    <div className="flex justify-center  items-center p-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className=" mt-28"
          onClick={() => handleShowModle(car)}
        >
          <Card
            imageUrls={car.imageUrls}
            name={car.name}
            price={car.price}
            vehicleId={car._id} 
            
          />
        </div>
      ))}
    </div>
          {showModal && (
            <EfahrzeugModal
              imageUrls={carDetails.imageUrls}
              name={carDetails.name}
              type={carDetails.type}
              driveRange={carDetails.driveRange}
              price={carDetails.price}
              chargingTime={carDetails.chargingTime}
              weight={carDetails.weight}
              vehicleId={carDetails._id}
              quantity={carDetails.quantity}
              closeModle={closeModle}
            />
          )}</>
  );
}

export default EVehicles;