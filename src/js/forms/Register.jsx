import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState([]);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleGoToLoginClick = () => {
    navigate("/login");
  };
  function submitHandler(evt) {
    evt.preventDefault();

    // Erstelle Objekt fuer den Body des Requests
    let registrationData = {
      username: username,
      email: email,
      password: password,
      fullname: fullname,
      city: city,
    };

    // Sende Request an /register endpoint der API
    axios
      .post("http://localhost:8081/auth/register", registrationData)
      .then((response) => {
        console.log(response); // TODO
        setErrors([]);
        setRegisterSuccessful(true);
      })
      .catch((error) => {
        console.error(error);

        setErrors([error.response.data.message.split(",")]);
      });
  }

  const successMsg = (
    <div className=" mt-36 pt-10  flex  flex-col justify-center items-center  border-green-500 border-2 pb-8  shadow-xl shadow-gray-400  rounded-lg ">
      <h1 className="text-3xl text-center   bg-white text-gray-500 ">
      Die Registrierung ist erfolgreich geschafft! <br />
      Bitte auf die unten gelikten knüpf klicken.
      </h1>

      <button
        onClick={handleGoToLoginClick}
        className=" w-fit m-auto  tracking-wider  mt-14 rounded-2xl shadow-md shadow-gray-400  bg-green-600 p-3   font-bold text-white  hover:scale-105 "
        role="button"
      >
        Go to Login
      </button>
    </div>
  );

  const errorBox = errors.map((error, idx) => {
    return <li key={idx}>{error}</li>;
  });

  return (
    <div className=" h-full lg:pt-18 justify-center items-center max-w-screen-sm my-5  bg-white  ">
      {registerSuccessful ? (
        successMsg
      ) : (
        <form className=" h-screen  lg:pt-18 lg:mt-40 mt-10 " onSubmit={submitHandler}>
          <div className=" w-full h-full max-w-lg flex flex-col gap-3 justify-start items-start lg:shadow-xl rounded px-10 py-24 lg:mt-7">
            <label
              className="block text-green-500 m-0 font-bold text-md mt-2 "
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />

            <label
              className="block text-green-500 m-0 font-bold text-md mt-2  "
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="fullname"
              value={fullname}
              onChange={(evt) => setFullname(evt.target.value)}
            />

            <label
              className="block text-green-500 m-0 font-bold text-md mt-2"
              htmlFor="email"
            >
              E-Mail Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />

            <label
              className="block text-green-500 m-0 font-bold text-md mt-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="Mannheim"
              value={city}
              onChange={(evt) => setCity(evt.target.value)}
            />

            <label
              className="block text-green-500 m-0 font-bold text-md mt-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            {errors.length > 0 && (
              <ul
                style={{
                  backgroundColor: "rgba(255,0,0,0.5)",
                  border: "1px solid red",
                }}
              >
                {errorBox}
              </ul>
            )}
            <div className="flex items-center justify-center pt-4">
              <button
                className="bg-green-600 w-fit text-2xl rounded-md hover:bg-gray-700 text-white font-bold py-1 px-2  focus:outline-none focus:shadow-outline"
                type="submit"
              >
               Register
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;
