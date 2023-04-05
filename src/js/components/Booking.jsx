import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservationType, setReservationType] = useState("electricCar");

  function handleReservationTypeChange(e) {
    setReservationType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Handle reservation submission
  }

  return (
    <div className="flex flex-col items-center justify-center min-h bg-gray-100 ">
      <h1 className="text-3xl font-bold mb-8">Rental Car Reservation System</h1>
      <form className="flex flex-col gap-2 bg-white p-5 rounded-md" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="start-date" className="font-bold">
            Start Date and Time:
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="end-date" className="font-bold">
            End Date and Time:
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="p-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="reservation-type" className="font-bold">
            Reservation Type:
          </label>
          <select
            id="reservation-type"
            value={reservationType}
            onChange={handleReservationTypeChange}
            className="p-2 border bg-white rounded-md"
          >
            <option value="electricCar">Electric Car</option>
            <option value="eScooter">E-Scooter</option>
            <option value="eBike">E-Bike</option>
          </select>
        </div>
        <div className="">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4 block w-full"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default Booking;
