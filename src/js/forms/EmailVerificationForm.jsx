import axios from "axios";
import { useState } from "react";


function EmailVerificationForm({msgs}) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState(msgs);
    const [emailVerificationMsg, setEmailVerificationMsg] = useState('');

    // Submit Handler fuer das Formular zum Versenden einer neuen E-Mail Verifikation
    async function submitHandler(evt) {
        evt.preventDefault();

        const body = {
            email: email
        };

        try {
            const response = await axios.put('http://localhost:8082/auth/verify', body);
            setEmailVerificationMsg(response.data.message);
            setEmail('');
            setErrors([]);

        } catch (error) {
            console.log(error);
            setErrors([error.response.data.message]);
        }
    }

    // Fehleranzeige
    const errorBox = errors.map((error, idx) => {
        return <li key={idx}>{error}</li>;
    });

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/12 mx-auto my-6" onSubmit={submitHandler}>
            <p style={{color: 'green'}}>{emailVerificationMsg}</p>
            {(errors.length > 0) && (<ul style={{backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red'}}>{errorBox}</ul>)}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    E-Mail
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="user@example.com" value={email} onChange={(evt) => setEmail(evt.target.value)} />
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Resend E-Mail
                </button>
            </div>
        </form>
    );
}


export default EmailVerificationForm;