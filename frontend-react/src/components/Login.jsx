import {React, useState, useContext }  from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(''); 
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);   
  
  const submitLoginForm = async(e) => {
    e.preventDefault();    
    setLoading(true);

    const userData = {
      username,
      password
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/token/', userData,  { headers: { "Content-Type": "application/json" }});
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);    
      
      console.log("Login successful");
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Invalid credentials: ", error);
      setErrors("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
      
    }

  }
  return (
    <>
      <div className='container' >
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 mt-5 rounded">
            <h3 className="text-light text-center mb-4">
             Login to Our Portal
            </h3>
            <form onSubmit={submitLoginForm}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />                
              </div>
              
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />                
              </div>
              {errors && <div className="text-danger">{errors}</div>}
              {loading ? (
              <button type="submit" className="btn btn-info d-block mx-auto" disabled><FontAwesomeIcon icon={faSpinner} spin /> Please wait...</button>) : (
              <button type="submit" className="btn btn-info d-block mx-auto">Login</button>
              )}
             
            </form>
          </div>
        </div>
      </div>    
    </>
  )
}

export default Login