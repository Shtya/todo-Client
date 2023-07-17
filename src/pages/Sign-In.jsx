import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import SignUp from './Sign-Up'
import { Error } from '../component/Notification'
import { baseURL } from '../config/API'


const SignIn = () => {
  const[show , setshow] = useState(false)
  const [email , setemail] = useState("")
  const [password , setpassword] = useState("")
  const [isLoad , setIsLoad] = useState(true)
  const [data , setData] = useState()
  const Navigate = useNavigate()


  const handleSub = async(e)=>{
    e.preventDefault()
    if(email === "") return Error("E-mail is required")
    if(password === "") return Error("password  is required")

    setIsLoad(true)
    await baseURL.post("/api/user/login" , { email , password}).then(res => setData(res.data)).catch(err => setData(err.response.data))
    setIsLoad(false)
  }
  
  useEffect(_=>{
    if(isLoad === false){

      setTimeout(() => {setIsLoad(true) }, 1000);
      
      if(data?._err) Error(data?._err[0].msg)
      else{
         localStorage.setItem("todouser" , JSON.stringify(data))
         setTimeout(() => {
          window.location.href = "/"
         }, 1000);
        }
    }
  } ,[isLoad])


  return (
    <div className='sign-in'>

      <div className="card">
        <div className="card_logo"></div>
        <div className="card_title"> ToDo-App</div>
        <form className="card_form">
          <div className="fields">

            <div className="username">
            <i className="fa-solid fa-envelope"></i>
             <input value={email} onChange={e=> setemail(e.target.value)}  type="username"  className="user-input"  placeholder="E-mail"/>
            </div>

            <div className="password">
            <i className="fa-solid fa-lock"></i>
              <input value={password} onChange={e=> setpassword(e.target.value)} type="password" className="pass-input" placeholder="password" />
            </div>

          </div>

          <button onClick={handleSub} style={{opacity : isLoad === false ? ".4" : "1"}} className="btn btn-custom btn-primary" >
            {isLoad === false && <span className="spinner-border spinner-border-sm" ></span>}
            Login
          </button>        
          
          </form>

        <div className="link" onClick={_=> setshow(!show)}>  <Link to="">Create a new account</Link></div>

      </div>
        {show && <SignUp setshow={setshow} show={show} />}
    </div>
  )
}

export default SignIn