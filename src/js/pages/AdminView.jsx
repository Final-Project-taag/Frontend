import React, {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function AdminAdd() {
  const [vehicleData, setVehicleData] = useState({
    type: "",
    name: "",
    driveRange: "",
    weight: "",
    price: "",
    chargingTime: "",
    quantity: "",
    imageUrls: null /* erweitern Sie Ihren State um image: null. */,
  })
  const [selectedImage, setSelectedImage] = useState(null) // Zustandsvariable für das ausgewählte Bild
  const navigate = useNavigate()

  const handleFileChange = event => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = function () {
      setVehicleData({...vehicleData, imageUrls: [reader.result]})
      setSelectedImage(reader.result) // Setzen des ausgewählten Bildes
    }
    if (file) {
      reader.readAsDataURL(file)
    } else {
      setVehicleData({...vehicleData, imageUrls: [""]})
      setSelectedImage(null) // Entfernen des ausgewählten Bildes
    }
  }

  const handleChange = event => {
    setVehicleData({...vehicleData, [event.target.name]: event.target.value})
  }
  const handleSubmit = async event => {
    event.preventDefault()
    const body = vehicleData
    try {
      const response = await axios
        .post(
          "https://green-wheels-backend.onrender.com/vehicles", // Ensure this is the correct endpoint for file upload.
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(res => {
          if (res.status === 201) {
            navigate("/e-vehicles")
          }
        })
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Fahrzeugs:", error)
    }
  }

  return (
    <div className="h-full md:h-[95vh] pt-20 ">
      <form
        className=" w-screen md:w-3/4 md:flex justify-center  h-full md:h-[75vh]  mt-10  md:shadow-xl  md:border  md:rounded-xl px-4 md:py-2 "
        onSubmit={handleSubmit}
      >
        <div className=" ml-2 w-full md:w-96 flex flex-col gap-3 justify-start items-start  md:px-0 md:py-14">
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="type">
            Art:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="type"
              onChange={handleChange}
              required
            />
          </label>
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="name">
            Name:
            <input
              className="shadow appearance-none border rounded md:max-w-screen- w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </label>
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="driveRange">
            Drive Range:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="driveRange"
              onChange={handleChange}
              required
            />
          </label>
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="weight">
            Gewicht:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="weight"
              onChange={handleChange}
              required
            />
          </label>

          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="price">
            Preis :
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="price"
              onChange={handleChange}
              required
            />
          </label>
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="chargingTime">
            Ladezeit:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="chargingTime"
              onChange={handleChange}
              required
            />
          </label>
          <label className=" text-green-600 dark:text-green-500  text-xl font-base m-0" htmlFor="quantity">
            Menge:
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="quantity"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="flex items-center  flex-col   justify-center pt-20 h-full md:w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[80%] h-[75%]   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-slate-800-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex  overflow-hidden  w-full h-full  flex-col items-center justify-center pt-5 pb-6">
              {!selectedImage /* In diesem Code sind die beiden <p>- und svg-Elemente in einer Fragment-Komponente (<>...</>) eingeschlossen, die nur dann angezeigt wird, wenn selectedImage null ist. Andernfalls wird das ausgewählte Bild angezeigt. */ && (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </>
              )}

              {selectedImage && <img className=" max-h-4/5" src={selectedImage} alt="Vorschau" />}
            </div>

            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <button
            className="w-fit m-auto  tracking-wider  md:mt-10 
            rounded-lg  shadow-md dark:shadow-sm shadow-gray-400   bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500 "
            type="submit"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  )
}
export default AdminAdd
