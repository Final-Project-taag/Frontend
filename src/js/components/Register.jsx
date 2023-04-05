
import { useState } from 'react';
import axios from 'axios';


function Register(props) {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);

  function submitHandler(evt) {
    evt.preventDefault();

    // Erstelle Objekt fuer den Body des Requests
    let registrationData = {
      username: username,
      fullname: fullname,
      email: email,
      city: city,
      password: password

    };

    // Sende Request an /register endpoint der API
    axios.post('http://localhost:8081/auth/register', registrationData)
      .then(response => {
        console.log(response); 
        /*      setErrors([]); */
        setRegisterSuccessful(true);
      })
      .catch(error => {
        console.error(error);

        /* setErrors([error.response.data.message.split(',')]); */
      });
  }

  const successMsg = <p style={{ color: 'green' }}>
    Register successful! <br />
    We've sent you an e-mail to verify your e-mail address. Please follow the provided link. <br />
    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      Resend E-Mail
    </a><br />
    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      Go to Login
    </a>
  </p>;

  const errorBox = errors.map((error, idx) => {
    return <li key={idx}>{error}</li>;
  });

  return (
    <div className='  justify-center items-center max-w-screen-sm my-5  bg-white  '>
      {
        registerSuccessful
          ? (successMsg)
          : (

            <form className=" flex-col  px-5 py-10" onSubmit={submitHandler} >
              {(errors.length > 0) && (<ul style={{ backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red' }}>{errorBox}</ul>)}
              <div className=" flex-row items-center  justify-center mb-7">

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)} />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                  Full Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="fullname" value={fullname} onChange={(evt) => setFullname(evt.target.value)} />



                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  E-Mail Address</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="Berlin" value={city} onChange={(evt) => setCity(evt.target.value)} />


                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password</label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(evt) => setPassword(evt.target.value)} />




                <div className="flex items-center justify-evenly">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

          )
      }
    </div>


  );
}

export default Register;

