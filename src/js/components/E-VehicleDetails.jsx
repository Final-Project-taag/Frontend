import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Card({ imageUrls, name, type, driveRange, price, weight ,chargingTime,reserved, vehicleId }) {

  const navigate = useNavigate()

  const handleReservation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bitte anmelden, um eine Reservierung vorzunehmen.");
      navigate("/auth/login"); // Weiterleitung zur Login-Seite
      return;
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 3); // Beispiel: Reservierung für 3 Tage

    navigate(`/booking/${vehicleId}`);

  };
  console.log(vehicleId);

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
             {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Type: {type} <br />
            Drive Range: {driveRange} km <br />
            Weight: {weight} kg <br />
            Price: €{price} <br />
            Charging Time: {chargingTime} hours <br />
            vehicleId: {vehicleId}
            Reserviert: {reserved}
          </p>    */}
          <table className="min-w-full text-center text-sm font-light">
            <thead
              className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <tr>
                <th scope="col" className=" px-6 py-4">#</th>
                <th colSpan="2" className=" px-6 py-4">{name}</th>

              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap  px-6 py-4">E-Fahrzeugtyp:</td>
                <td className="whitespace-nowrap  px-6 py-4">{type}</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">2</td>
                <td className="whitespace-nowrap  px-6 py-4">Reichweite:</td>
                <td className="whitespace-nowrap  px-6 py-4">{driveRange}  KM</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">3</td>
                <td className="whitespace-nowrap  px-6 py-4 ">Ladezeit</td>
                <td className="whitespace-nowrap  px-6 py-4">{chargingTime} St</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">4</td>
                <td className="whitespace-nowrap  px-6 py-4"> Preis  </td>
                <td colSpan="2" className="whitespace-nowrap  px-6 py-4"> {price} €/hrs</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleReservation}
          >
            Reservieren
          </button>
        </div>
      </div>
    </div>
  );
}
export default Card
