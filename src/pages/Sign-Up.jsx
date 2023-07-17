import React, { useEffect, useState } from 'react'
import {baseURL} from "../config/API"
import {Error , success} from "../component/Notification"
const SignUp = ({setshow , show}) => {

  const [email , setemail] = useState("")
  const [name , setname] = useState("")
  const [password , setpassword] = useState("")
  const [passConfirm , setpassConfirm] = useState("")
  const [isLoad , setIsLoad] = useState(true)

  const [data , setData] = useState()
  const handleSub = async(e)=>{
    e.preventDefault()
    if(name === "") return Error("Name  is required")
    if(email === "") return Error("E-mail is required")
    if(password === "") return Error("password  is required")
    if(passConfirm === "") return Error(" passwordConfirm  is required")
    if(passConfirm !== password) return Error("password don't equal password confirm ")
    
    setIsLoad(true)
    await baseURL.post("/api/user/signup" , {name , email , password}).then(res => setData(res.data)).catch(err => setData(err.response.data))
    setIsLoad(false)
  }
  
  useEffect(_=>{
    if(isLoad === false){
      setTimeout(() => {setIsLoad(true) }, 1000);
      
      if(data?._err) Error(data?._err[0].msg)
      else{
         localStorage.setItem("todouser" , JSON.stringify(data?.data))
         setTimeout(() => {
          setshow(!show)
         }, 1000);
        }
    }
  } ,[isLoad])


  return (
    <div className='Sign-Up'>
        <div className="card">
        <i onClick={_=> setshow(!show)} className="fa-solid fa-circle-right exit"></i>
        <div className="card_logo"></div>
        <div className="card_title"> ToDo-App</div>
        <form className="card_form">
          <div className="fields">

            <div className="username">
            <i className="fa-solid fa-user"></i>
             <input value={name} onChange={e=> setname(e.target.value)}  type="username"  className="user-input"  placeholder="username"/>
            </div>

            <div className="username">
            <i className="fa-solid fa-envelope"></i>
             <input value={email} onChange={e=> setemail(e.target.value)}  type="username"  className="user-input"  placeholder="E-mail"/>
            </div>

            <div className="username">
            <i className="fa-solid fa-lock"></i>
             <input value={password} onChange={e=> setpassword(e.target.value)}  type="username"  className="user-input"  placeholder="password"/>
            </div>

            <div className="password">
            <i className="fa-solid fa-lock"></i>
              <input value={passConfirm} onChange={e=> setpassConfirm(e.target.value)} type="password" className="pass-input" placeholder="password confirm" />
            </div>

          </div>

          <button onClick={handleSub} style={{opacity : isLoad === false ? ".4" : "1"}} className="btn btn-custom btn-primary" >
            {isLoad === false && <span className="spinner-border spinner-border-sm" ></span>}
            Register
          </button>

        </form>

      </div>
    </div>
  )
}

export default SignUp