import React, { useContext, useState } from 'react'
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';
import './userVerification.css'
import { useNavigate } from 'react-router';

const UserVerification = () => {
    const [v_code,setV_code] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {login,formData,setFormData} = useContext(RentifyContext)

    const handleVerification = async () => {
        setLoading(true)
        if (v_code === '' || v_code === null) {
            setError("Verification code is empty")
            setLoading(false)
        }
        else{
            const response = await fetch("http://localhost:4000/api/verification/verify",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email: formData.email,
                    user_verification_code: v_code,
                })
            })

            if (response.ok) {
                const data = await response.json();
                setLoading(false)
                setFormData({
                    userName:"",
                    email:"",
                    contact:"",
                    type:"",
                    password:""
                })
                login(data.user);
                navigate("/");
                
            } else {
                const data = await response.json();
                setError(data.message);
                setLoading(false)
            }
          
        }
    }

    const handleRetry = async() => {
        setLoading(true)
        try {
            await fetch(`http://localhost:4000/api/verification/retry/${formData.email}`)
            setError("verification code has been sent again")
        } catch (error) {
            setError("error try again some other time")
        }
        setLoading(false)
    }


  return (
    <div className='user-verification'>
        <h2>Verification</h2>
        <p>A verication code has been sent your registerd email-id, Please enter the code to continue</p>
        <div>
        <label>Verification Code : </label>
        <input onChange={(e) => {
            setV_code(e.target.value)
        }} type='text' name='verification-code' value={v_code} placeholder='verification-code'></input>
        </div>
        <div className='buttons'>
        <button className='verify-button' onClick={handleVerification}>Verify</button>
        <button onClick={handleRetry} className='retry-button'>resend</button>
        </div>
        {loading ? <p className='loading'>Loading...</p> : <>{error && <p className='error'>{error}</p>}</>}
        
      
    </div>
  )
}

export default UserVerification
