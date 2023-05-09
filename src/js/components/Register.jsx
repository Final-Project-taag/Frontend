
import { useState } from 'react';
import axios from 'axios';


function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState([]);
    const [registerSuccessful, setRegisterSuccessful] = useState(false);

    function submitHandler(evt) {
        evt.preventDefault();
        
        // Erstelle Objekt fuer den Body des Requests
        let registrationData = {
          username: username,
          email: email,
          password: password,
          fullname: fullname,
          city: city
        };
    
        // Sende Request an /register endpoint der API
        axios.post('http://localhost:8080/auth/register', registrationData)
          .then(response => {
            console.log(response); // TODO
            setErrors([]);
            setRegisterSuccessful(true);
          })
          .catch(error => {
            console.error(error);

            setErrors([error.response.data.message.split(',')]);
          });
    }

    const successMsg = <p style={{color: 'green'}}>
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
        <>
        {
          registerSuccessful
          ?  (successMsg)
          : (
            
                <form className="max-w-screen-md " onSubmit={submitHandler} >
                {(errors.length > 0) && (<ul style={{backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red'}}>{errorBox}</ul>)}
                    <div className=" flex-row items-center  justify-center mb-7">
                        <div className="flex items-center justify-evenly">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)}/>

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                                Full Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="fullname" value={fullname} onChange={(evt) => setFullname(evt.target.value)}/>
                        </div>

                        <div className="flex items-center justify-evenly"> 
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                E-Mail Address</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" value={email} onChange={(evt) => setEmail(evt.target.value)}/>
                            
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                City</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="Mannheim" value={city} onChange={(evt) => setCity(evt.target.value)}/>
                        </div>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password</label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(evt) => setPassword(evt.target.value)} />
                        

                        
                    </div>
                    <div className="flex items-center justify-evenly">
                        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            
          )
        }
        </>

        
    );
}

export default Register;

