import React, {useState} from 'react'
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitRegistrationForm = async(e) => {
    e.preventDefault();
    setLoading(true);     
    // Get the form data
    const formData = {
      username,
      email,
      password,
      confirmPassword
    }; 
    // Handle form submission logic if password and confirm password match
    // send data to backend 
   try {
    const response = await axios.post('http://localhost:8000/api/v1/register/', formData,  { headers: { "Content-Type": "application/json" }});
    console.log("response.data: ", response.data);
    console.log("User registered successfully");
    setSuccess(true);
    // Clear form fields after successful registration
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
   } catch (error) {
    setErrors(error.response.data);
    console.error("Error registering user:", error.response.data);
    console.log("error message: ", error.message);
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
             Create an Account
            </h3>
            <form onSubmit={submitRegistrationForm }>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
              </div>

              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <small>{errors.email && <div className="text-danger">{errors.email}</div>}</small>
              </div>

              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
                <small>{errors.non_field_errors && <div className="text-danger">{errors.non_field_errors}</div>}</small>
              </div>

              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <small>{errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}</small>
              </div>
              {success && <div className="alert alert-success">{success && "Registration successful! You can now log in."}  </div>}
              {loading ? (<button type="submit" className="btn btn-info d-block mx-auto" disabled>Please wait...</button>) : (<button type="submit" className="btn btn-info d-block mx-auto">Register</button>)}

              {(() => {
                setTimeout(() => { setSuccess(false); setLoading(false); }, 25000);
              })()}
            </form>
          </div>
        </div>
      </div>    
    </>
  )
}

export default Register