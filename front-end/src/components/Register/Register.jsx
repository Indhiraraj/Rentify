import React, { useContext, useState } from 'react';
import './register.css';
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const { formData, setFormData } = useContext(RentifyContext);
    const [error, setError] = useState('');
    const [isPasswordVisible,setIsPasswordVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    
    function isNumeric(str) {
        return /^\d+$/.test(str);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'contact') {
            if (!isNumeric(value) && value.length > 0) {
                return;
            }
        }
        setFormData({ ...formData, [name]: value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.contact.length !== 10) {
            console.log("test");
            setError('Contact number must be exactly 10 digits');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setError('Invalid email address');
            return;
        }

        if(formData.password.length < 8){
            setError('Password must be atleast 8 characters')
            return;
        }

        const hasCapitalLetter = /[A-Z]/.test(formData.password);
        if(!hasCapitalLetter){
            setError('Password must contain atleast one Capital letter')
            return;
        }

        const hasSmallLetter = /[a-z]/.test(formData.password);
        if(!hasSmallLetter){
            setError('Password must contain atleast one Small letter')
            return;
        }

        const hasDigit = /\d/.test(formData.password); 
        if(!hasDigit){
            setError('Password must contain atleast one digit')
        }

        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
        if (!hasSpecialCharacter) {
            setError('Password must contain atleast one Special Character')
            return;
        }


        setLoading(true);

        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setError('');
            setLoading(false);
            navigate("/verification");
        } else {
            const data = await response.json();
            setLoading(false);
            console.log("test");
            setError(data.message)
        }
    }

    return (
        <div className='register'>
            <form onSubmit={handleRegister}>
                <h1>Registration</h1>
                <div>
                    <input name='userName' value={formData.userName} onChange={handleChange} type='text' placeholder='Username' required autoComplete="off"/>
                </div>
                <div>
                    <input name='email' value={formData.email} onChange={handleChange} type='text' placeholder='Email' required autoComplete="off" />
                </div>
                <div>
                    <input name='contact' maxLength={10} value={formData.contact} onChange={handleChange} type='text' placeholder='Phone Number' required />
                </div>
              
                <div className='password-container'>
                    
                   
                    <input name='password' value={formData.password} onChange={handleChange} placeholder='Password' type={isPasswordVisible ? 'text' : 'password'} required autoComplete='new-password'/>
                    
            {isPasswordVisible ? <VisibilityOffIcon onClick={togglePasswordVisibility} fontSize='inherit' className='toggleButton'/> : <VisibilityIcon onClick={togglePasswordVisibility} fontSize='inherit' className='toggleButton'/> }
          
                </div>
                <div className='register-container'>
                    {loading ? <p className='loading'>Loading...</p> : <>{error && <p className='error'>{error}</p>}</>}
                
                <button type='submit'>Register</button>
                
                <p>Already have an account? <Link to="/login">login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
