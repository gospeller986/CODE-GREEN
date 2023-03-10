import React , {useState } from "react";
import { Link , useNavigate } from 'react-router-dom' ; 
import Base from './Base';
import signup from '../assets/signup.svg'
import axios from 'axios';
import './Signup.css'



const Signup = () => {

    const [data,setData] = useState({
        firstName : "",
        lastName : "" ,
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
            const url = "http://localhost:8000/api/users" ;
            const {data : res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message) 
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
        <Base title='Sign Up' description='Create an Account'> 
           <div className="container">
           <div className="container">
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div className="my-3 py-3 text-center">
                <form className='form_container' onSubmit={handleSubmit} >
                        <h1>Create an Account </h1>
                         
                        <input type="text"
                         placeholder='First Name' 
                         className="first"
                         name='firstName'
                         onChange={handleChange}
                         value={data.firstName}
                         required
                         /> <br />
                         <input type="text"
                         placeholder='Last Name' 
                         className="last"
                         name='lastName'
                         onChange={handleChange}
                         value={data.lastName}
                         required
                         /> <br />          
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
                         <button  type='submit' className="button" >
                            Login
                         </button>
                     </form>

                </div>
                <div className="bg-light box-shadow mx-auto"></div>
              </div>
              <div className=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                  <div className="vec">
                  <p><span className="sign" > Already have an account ??? </span>  <Link to='/login' > 
                    
                    Login
          
                </Link> </p>

                    <img src={signup} className = "image" alt="img" /> 
                  </div>
                </div>
                <div className="bg-dark box-shadow mx-auto"></div>
              </div>
            </div>
          </div>
           </div>
        </Base>
    </div>
  )
}

export default Signup ;