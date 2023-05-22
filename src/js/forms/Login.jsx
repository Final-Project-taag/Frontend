import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
/* import EmailVerificationForm from './EmailVerificationForm'; */
 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [notVerified, setNotVerified] = useState(false);
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();


    
    async function loginSubmitHandler(evt) {
        evt.preventDefault();

        let body = {
            username: username,
            password: password
        };

        if ((username.length < 1) || password.length < 1) {
            let errorsSet = new Set(errors);

            errorsSet.add('Username and password must not be empty');

            setErrors([...errorsSet]);
            return;
        }

        try {
            let resp = await axios.post('http://localhost:8081/auth/login', body, {
                // withCredentials: true
            });
            

            authStore.authenticate(resp.data);
            // localStorage.setItem('token', resp.data.token);
            // sessionStorage.setItem('token', resp.data.token);

            setUsername('');
            setPassword('');
            setErrors([]);

            console.log('Success: token stored in localStorage and sessionStorage');

            //die Navigation nach erfolgreicher Anmeldung:
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                // Navigiere zur E-Vehicles-Seite
                navigate('/e-vehicles');
            }

        } catch (error) {
            console.error(error);
            if (error.response.status === 403) setNotVerified(true);
            setErrors([error.response.data.message]);
        }
    }

    // Login Erfolgsnachricht
    const loginSuccess = <p style={{ color: 'green' }}>Login successful!</p>;

    // Fehleranzeige
    const errorBox = errors.map((error, idx) => {
        return <li key={idx}>{error}</li>;
    });

    return (

    <div className="flex justify-center items-center w-screen h-screen py-3"
          
        >
{/* Wenn eingeloggt, zeige Erfolgsnachricht */ }
            {authStore.isAuthenticated() && loginSuccess}
 
 {
     // Wenn eingeloggt, zeige Logout Button
     authStore.isAuthenticated() ? 
         ( <button onClick={evt => authStore.logout()} className="flex items-center  justify-center  text-gray-700 font-sans py-1 px-1  focus:outline-none focus:shadow-outline" type="button">
             <svg className="h-12 w-10 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
             Logout</button> ) 
     : 
         (
         // Wenn nicht verifiziert, zeige Formular zum Versenden der Verifikationsmail
         // sonst das normale Loginformular
         notVerified
         ? msgs={errors}
         : <form className="w-full max-w-md flex-col items-center justify-center  md:shadow-xl  md:border-2 md:rounded-xl px-10 py-5 " onSubmit={loginSubmitHandler}>

             {(errors.length > 0) && (<ul style={{backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red'}}>{errorBox}</ul>)}
             <div className="mb-6 ">
                 <label className=" block text-green-600 dark:text-green-500 text-xl font-base  mb-2" htmlFor="username">
                     Username
                 </label>
                 <input className="w-full shadow appearance-none  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight " id="username" type="text" placeholder="Username" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
             </div>

             <div className="mb-6">
                 <label  className="block text-green-600 dark:text-green-500 text-xl font-base  mb-2" htmlFor="password">
                     Password
                 </label>
                 <input className="w-full shadow appearance-none  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight " id="password" type="password" placeholder="******************" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
             </div>

             <div className="flex items-center justify-evenly">
                 <button   className="bg-green-600 hover:bg-gray-800-700 text-white font-bold py-1 px-2 shadow-md rounded-xl focus:outline-none focus:shadow-outline hover:scale-105" type="submit">
                     Sign In
                 </button>
                 
              </div>

         </form>
         )
 } 
 </div>
 
);
}


export default Login;


      