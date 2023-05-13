import useQuery from "../hooks/useQuery";
import axios from "axios";
import { useEffect, useState } from "react";
import EmailVerificationForm from "../forms/EmailVerificationForm";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";


function EmailVerification() {
    const [respMsg, setRespMsg] = useState('');
    const [verificationFailed, setVerificationFailed] = useState(false);
    const queryParams = useQuery();
    const navigate = useNavigate();
    useEffect(() => {
        async function sendVerification() {
            try {
                
                const body = {
                    token: queryParams.get('t')
                };
                const resp = await axios.post('http://localhost:8081/auth/verify', body);

                const {redirectTo, message} = resp.data;
                
                setRespMsg(message);

                navigate('/login');

            } catch (error) {
                const {redirectTo, message} = error.response.data;
                setRespMsg(message);
                setVerificationFailed(true);
            }
        }

        sendVerification();
    }, []);

    return (
        <>
            {
                verificationFailed
                ? <EmailVerificationForm msgs={[respMsg]} />
                : <p>{respMsg}</p>
            }
        </>
    );
}

export default EmailVerification;