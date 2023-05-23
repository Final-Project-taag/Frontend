import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  isActiveReservation,
  formatDate,
  calculateTotalPrice,
  getActiveReservationId,
} from "../utils/helper";
import {
  updateReservation,
  deleteReservation,
  bookReservation,
} from "../api/reservationApi";
import { deleteBooking } from "../api/bookingApi";
import axios from "axios";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import useAuthStore from "../hooks/useAuthStore";

function reservationCard({ reservation, isBooking, fetchData }) {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role?.name === "admin";

  const [startDate, setStartDate] = useState(
    new Date(reservation.startDate || null)
  );
  const [endDate, setEndDate] = useState(new Date(reservation.endDate || null));
  const [isEditingMood, setIsEditingMood] = useState(false);
  const hours = new Date(reservation.startDate).getHours();

  const confirmBooking = async (reservationId) => {
    bookReservation(reservationId).then(() => fetchData());
  };
  const handleEditReservation = () => {
    if (isEditingMood) {
      updateReservation(reservation._id, { startDate, endDate });
      setIsEditingMood(false);
      fetchData();
    } else {
      setIsEditingMood(true);
    }
  };
  const deleteItem = (itemId) => {
    if (isBooking) {
      deleteBooking(itemId).then(() => fetchData());
    } else {
      deleteReservation(itemId).then(() => fetchData());
    }
  };

  return (
    reservation._id && (
      <div className="   flex justify-start flex-col lg:flex-row  lg:h-80 h-full rounded-lg text-gray-700 dark:text-gray-500 dark:border-green-500 border-gray-400 bg-slate-200 border-2  my-2  md:my-6 shadow w-full">
        <div className="  w-full  ">
          <img
            className=" lg:ml-2  px-2 md:px-0 lg:py-2   h-full"
            src={reservation.vehicle?.imageUrls[0]}
            alt=""
          />
        </div>

        <div className="p-5 grow-1    md:mx-2   w-full ">
          {/* <h5>ID Nummer: {reservation.vehicle._id}</h5> */}

          {isAdmin && <h2 className="text-xl font-bold mb-2">
            Kunde: {reservation.user.fullname}
          </h2>}
          <p>
            {isBooking ? "Booking Nr. " : "Reservation Nr. "} {reservation._id}{" "}
          </p>
          <p>E-FahrZeug : {reservation?.vehicle?.name}</p>
          <div className="flex justify-between w-full py-2">
            <p>Von: </p>{" "}
            {isBooking ? (
              <p>{reservation.startDate}</p>
            ) : (
              <DateTimePicker
                format="y-MM-dd h a"
                className="mr-2 w-4/5  "
                disabled={!isEditingMood}
                locale="en"
                onChange={setStartDate}
                value={startDate}
              />
            )}
          </div>
          <div className="flex justify-between w-full py-2">
            <p>Bis: </p>{" "}
            {isBooking ? (
              <p>{reservation.endDate}</p>
            ) : (
              <DateTimePicker
                format="y-MM-dd h a"
                className="mr-2 w-4/5"
                disabled={!isEditingMood}
                locale="en"
                onChange={setEndDate}
                value={endDate}
                minDate={startDate}
              />
            )}
          </div>

          <p>Total Price: {reservation?.totalPrice}€</p>
         
          {!isAdmin  && (
            <>
             <p>Adress Friedrichsplatz, 68165 Mannheim</p>
            <div className="flex  justify-center md:justify-start items-center gap-4 w-fit pt-5">
              {!isBooking && (
                <>
                  <button
                    type="button"
                    className="w-20 md:w-24  m-auto  tracking-wider  md:mt-0
             rounded-md  shadow-sm dark:shadow-sm shadow-gray-400   bg-green-600 p-2 md:px-6 font-base  text-gray-200 hover:bg-green-500"
                    onClick={() => confirmBooking(reservation?._id)}
                  >
                    Buchen
                  </button>
                  <button
                    type="button"
                    className="w-20 md:w-24 m-auto  tracking-wider  md:mt-0
             rounded-md  shadow-sm dark:shadow-sm shadow-gray-400   bg-gray-500 p-2 md:px-6 font-base  text-gray-200 hover:bg-green-500"
                    onClick={handleEditReservation}
                  >
                    {isEditingMood ? "Save" : "Edit"}
                  </button>
                  <button
                    className=" bg-red-500 hover:bg-red-700 w-20 md:w-24  m-auto  tracking-wider  md:mt-0
             rounded-md  shadow-sm dark:shadow-sm shadow-gray-400   p-2 md:px-6 font-base  text-gray-200 "
                    onClick={() => deleteItem(reservation?._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            </>
          )}
          {isAdmin && isBooking && (
            <button
              className=" bg-red-500 hover:bg-red-700 w-20 md:w-24  m-auto  tracking-wider  md:mt-0
             rounded-md  shadow-sm dark:shadow-sm shadow-gray-400   p-2 md:px-6 font-base  text-gray-200 "
              onClick={() => deleteItem(reservation?._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default reservationCard;
