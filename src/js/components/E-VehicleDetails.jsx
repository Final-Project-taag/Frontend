import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Card({ imageUrls, name, type, driveRange, price, chargingTime, vehicleId }) {

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
 
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b  w-full m-0 font-bold  dark:border-neutral-500 dark:bg-neutral-900">
                 <tr><td colSpan="2" className=" px-6 py-4 ">{name}</td></tr>
            </thead>
            <tbody>
              {/* <tr className="border-b dark:border-neutral-500">
                
                <td className="whitespace-nowrap  px-6 py-4">E-Fahrzeugtyp:</td>
                <td className="whitespace-nowrap  px-6 py-4">{type}</td>
              </tr> */}
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
            </tbody>
          </table>
          <button
            type="button"
            className="inline-block  rounded bg-green-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white "
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
