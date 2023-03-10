import React , {useState } from "react";
import { Link , useNavigate } from 'react-router-dom'
import Base from "./Base";
import axios from 'axios'
import login from '../assets/login.svg'
import './Login.css'

const Login = () => { 
    const [data,setData] = useState({
        email : "" ,
        password : ""
    })
    const [error,setError] = useState("")

    const navigate = useNavigate() ;
    
    const handleChange = ({currentTarget : input}) => {
        setData({...data,[input.name]:input.value })
    } 

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        try {
            const url = "http://localhost:8000/api/auth" ;
            const {data: res} = await axios.post(url,data);
            localStorage.setItem("token",res.data)
            navigate("/dashboard");

        } catch (error) {
             if(error.response && 
                 error.response.status >= 400 && 
                   error.response.status <= 500
                  ){
                   setError(error.response.data.message)
                  }
        }
    }
  return (
    <div>
      <Base title="Login Page" description="Welcome to Our Project">
        <div className="container">
          <div className="container">
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div className="my-3 py-3 text-center">
                <form className='form-custom' onSubmit={handleSubmit} >
                        <h1>Login to your Account</h1>
                       
                         <input type="email"
                         className="email"
                         placeholder='Email' 
                         name='email'
                         onChange={handleChange}
                         value={data.email}
                         required
                         /> <br />
                         <input type="password"
                         className="pass"
                         placeholder='Password' 
                         name='password'
                         onChange={handleChange}
                         value={data.password}
                         required
                         /> <br />
                         {error && <div className="error_message">
                            {error}
                         </div> }
                         <br />
                         <button  type='submit' className="button-custom" >
                            Login
                         </button>
                     </form>
  
                </div>
                <div className="bg-light box-shadow mx-auto"></div>
              </div>
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <div className="vec">
                  <p><span className="sign" > New Here ??? </span>  <Link to='/signup' > 
                    
                    Sign up 
          
                </Link> </p>

                    <img src={login} className = "image" alt="img" /> 
                  </div>
                </div>
                <div className="bg-dark box-shadow mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Login;
