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
    <div>
    <h1 className="text-3xl text-center   bg-white text-gray-500">
      Register successful! <br />
      We've sent you an e-mail to verify your e-mail address. Please follow the
      provided link. <br />
     </h1>
      <button
        onClick={() => {}}
        className="button-85 inline-block align-baseline text-sm "
        role="button"
      >
        Resend E-Mail
      </button>
      <br />
      <button
        onClick={handleGoToLoginClick}
        className=" w-fit m-auto  tracking-wider  mt-20 rounded-2xl shadow-md shadow-gray-400  bg-green-600 p-3   font-bold text-white  hover:scale-105 "
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
    <div className="  pt-20 justify-center items-center max-w-screen-m md:my-5  ">
      {registerSuccessful ? (
        successMsg
      ) : (
        <form className=" md:h-screen  h-[83vh] pt-16 md:pt-20  " onSubmit={submitHandler}>
          <div className=" w-full  max-w-lg flex flex-col gap-3 justify-start items-start md:shadow-xl  md:border  md:rounded-xl px-10 md:py-14 ">
            <label
              className=" text-green-600 dark:text-green-500  text-xl font-base m-0"
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
              className="text-green-600 dark:text-green-500 text-xl font-base m-0"
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
              className="text-green-600 dark:text-green-500 text-xl font-base m-0"
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
              className="text-green-600 dark:text-green-500 text-xl font-base m-0"
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
              className="text-green-600 dark:text-green-500 text-xl font-base m-0"
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
            <div className="flex items-center justify-evenly">
              <button
                className="bg-green-600 hover:bg-gray-800-700 text-white font-bold py-1 px-2 shadow-md rounded-xl focus:outline-none focus:shadow-outline hover:scale-105"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
export default Register;