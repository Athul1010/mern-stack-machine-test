import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/Login.css'

const Login = () => {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate();


    let login = (e) => {
        e.preventDefault();

        let data = { email, password }
        if (email == "admin@gmail.com" && password == 1234) {
            navigate('/dashboard')
        } else {
            alert("Inavalid credentials")               
        }
    }

  return (
    <div className="container">
            <div className="row login-section">
                <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12">
                    <h1>Login</h1>
                    <div className="login-wrapper">
                        <h4 className='signIn_form'>Sign in to your account</h4>
                        <form action="" onSubmit={login}>
                            <div className="mb-3">
                                <label htmlFor="email" className="email-label">Your email</label>
                                <input type="email" className="form-control" id="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="password-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <button type="submit" className="signIn-button">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login