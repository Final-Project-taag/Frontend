import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";


function Card({ imageUrls, name, type, driveRange, price, chargingTime, vehicleId, quantity }) {
  const [isReserved, setIsReserved] = useState(false);
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(null);
  //  Zustand des Detailbereichs zu verwalten:
  const [showDetails, setShowDetails] = useState(false);
  //  totalPrice hinzufügen, um den berechneten Preis zu speichern:
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vehicle, setVehicle] = useState("");

  const calculateTotalPrice = (pickupTime, returnTime) => {
    // Berechnen Sie hier den Gesamtpreis basierend auf den Eingabefeldern
    // Zum Beispiel:
    const durationInHours = (returnTime - pickupTime) / (60 * 60 * 1000);
    const calculatedPrice = durationInHours * price;
    setTotalPrice(calculatedPrice);
  };


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

  // Buchen Button Funktion
  /*   const handleBooking = (vehicleId) => {
      navigate(`/booking/${vehicleId}`);
    }; */
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


  return (
    <div className="flex justify-center">

      <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700 hover:scale-110 transform transition-all duration-300">
        <a href="#!">

          <img className="rounded-t-lg" src={imageUrls} alt="" style={{ width: "500px", height: "300px", objectFit: "inherit" }} />

        </a>
        <div className="p-2">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {name}
          </h5>

          <table className="min-w-full text-center text-sm font-light">
            <thead
              className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <tr>
                <th scope="col" className=" px-6 py-4">Model:</th>
                <th colSpan="1" className=" px-6 py-4">{name}</th>

              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap  px-6 py-4">E-Fahrzeugtyp:</td>
                <td className="whitespace-nowrap  px-6 py-4">{type}</td>
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
                <td className="whitespace-nowrap  px-6 py-4 font-medium">5</td>
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
      {showDetails && (
        /*  <div>
           <label htmlFor="pickupTime">Abholzeit:</label>
           <input type="datetime-local" id="pickupTime" name="pickupTime" />

           <label htmlFor="returnTime">Bringzeit:</label>
           <input type="datetime-local" id="returnTime" name="returnTime" />
         </div> */
        <form className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-lg border-2 border-solid border-black w-5/6 mx-auto" >
          <div className="flex  flex-col">
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
      )
}
      

    </div >

  );
}
export default Card
