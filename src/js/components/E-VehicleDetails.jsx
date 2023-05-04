import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Card({ imageUrls, name, type, driveRange, price, chargingTime, vehicleId, quantity }) {
  const [reservationStatus, setReservationStatus] = useState("Reservieren")

  const [isReserved, setIsReserved] = useState(false);
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(null);
  //  Zustand des Detailbereichs zu verwalten:
  const [showDetails, setShowDetails] = useState(false);
  //  totalPrice hinzufügen, um den berechneten Preis zu speichern:
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
const [vehicle, setVehicle] = useState(null)


  useEffect(() => {
    let timer;

    if (isReserved) {
      const endTime = new Date(Date.now() + 60 * 60 * 1000);
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime();
        setTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(timer);
          setIsReserved(false);
          setTimeLeft(null);
        }
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isReserved]);

  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  // ------------------------------------------------RESERVIERUNG--------------------------------------------//
  const handleReservation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      navigate("/auth/login"); // Weiterleitung zur Login-Seite
      return;
    }

    if (quantity === 0) {
      alert("Keine Fahrzeuge verfügbar.");
      return;
    }

    const startDate = new Date();

    const reservationDuration = 60 * 60 * 1000; // 1 Stunde in Millisekunden
    const reservedUntil = new Date(Date.now() + reservationDuration);
    const endDate = reservedUntil;

    try {
      const response = await fetch("http://localhost:8081/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId,
          startDate,
          endDate,
          createdAt: new Date(),
          reserved: true,
          reservedUntil,
        }),
      });
      if (!response.ok) {
        throw new Error("Fehler bei der Reservierung");
      }

      const newReservation = await response.json();
      console.log("Reservierung erfolgreich: ", newReservation);

      alert("Reservierung erfolgreich!");
      setIsReserved(true);
      setTimeout(() => setIsReserved(false), reservationDuration);

    } catch (error) {
      console.error("Fehler bei der Reservierung: ", error);
      alert("Fehler bei der Reservierung. Bitte versuchen Sie es erneut.");
    }
  };


  // das Detailfeld und die Eingabefelder anzuzeigen, wenn auf "Reservierung Fortsetzen" geklickt wird:
  const handleShowDetails = () => {
    setShowDetails(true);
  };

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

  // Funktion zur Berechnung des Startdatums
  const calculateStartDate = (price) => {
    return new Date(Date.now() + price * 60 * 60 * 1000);
  };

  // Funktion zur Aktualisierung des Startdatums
  const handleStartDateChange = (event) => {
    const hoursFromNow = parseInt(event.target.value, 10);
    setStartDate(calculateStartDate(price));
  };
  // Funktion zur Aktualisierung der Dauer
  const handleDurationChange = (event) => {
    const durationInHours = parseInt(event.target.value, 10);
    setEndDate(new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000));
  };
  // Funktion zur Berechnung des Gesamtpreises
  // Funktion zur Berechnung des Gesamtpreises
  const calculateTotalPrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const durationInHours = (endDate - startDate) / (60 * 60 * 1000);
      return durationInHours * price;
    }
    return 0;
  };



  return (
    <div className="flex b flex-col ">

      <div className="block evehicleCard px-4 max-w-screen-md rounded-lg bg-green-400 text-center shadow-xl shadow-stone-700 dark:bg-neutral-700 hover:scale-110 transform transition-all duration-300">
        <a href="#!">
          <h5 className="mb-2 pt-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {name}
          </h5>
          <img className="rounded-t-lg" src={imageUrls} alt="" style={{ width: "300px", height: "200px", objectFit: "inherit" }} />

        </a>
        <div className="p-2">


          <table className="min-w-full text-center text-sm font-light">
            <thead
              className="border-b bg-green-900 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <tr>
                <th scope="col" className=" px-6 py-4">Model:</th>
                <th colSpan="2" className=" px-6 py-4">{name}</th>

              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-1 py-2">E-Fahrzeugtyp:</td>
                <td className="whitespace-nowrap  px-6 py-2">{type}</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">

                <td className="whitespace-nowrap  px-6 py-4">Reichweite:</td>
                <td className="whitespace-nowrap  px-6 py-4">{driveRange}  KM/H</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">

                <td className="whitespace-nowrap  px-6 py-4 ">Ladezeit</td>
                <td className="whitespace-nowrap  px-6 py-4">{chargingTime} St</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">

                <td className="whitespace-nowrap  px-6 py-4"> Preis  </td>
                <td colSpan="2" className="whitespace-nowrap  px-6 py-4"> {price} €</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4">Verfügbare Menge:</td>
                <td className="whitespace-nowrap  px-6 py-4">{quantity}</td>
              </tr>
            </tbody>
          </table>

          <div className=" py-2 ">
            <button
              type="button"
              className={`inline-block rounded px-6  pt-2.5 pb-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0 ${isReserved
                ? "bg-red-600 text-white"
                : "bg-slate-200 text-green-900 shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                }`}
              onClick={handleReservation}
              disabled={quantity === 0}
            >
              {quantity === 0 ? "Nicht verfügbar" : isReserved ? "Reserviert" : "Reservieren"}
            </button>
            {isReserved && (
              <div className="ml-4 text-red-600">
                {timeLeft !== null ? formatTimeLeft(timeLeft) : ""}

                <button
                  type="button"
                  className="bg-slate-200 px-6 pt-2.5 pb-2 text-green-900 shadow-[0_4px_9px_-4px_#3b71ca] text-xs font-medium uppercase hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  onClick={() => {
                    /*  handleBooking(); */
                    handleShowDetails();
                  }}
                  disabled={quantity === 0}
                >
                  Reservierung Fortsetzen
                </button>



              </div>

            )}


          </div>

        </div>

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
                  const startDate = new Date(Date.now() + parseInt(e.target.value) * 60 * 60 * 1000);
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
                  const endDate = new Date(startDate.getTime() + parseInt(e.target.value) * 60 * 60 * 1000);
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


    </div >

  );
}
export default Card
