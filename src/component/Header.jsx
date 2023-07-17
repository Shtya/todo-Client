import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import login from '../image/login.png'
const Header = () => {
  const [user, setuser] = useState("")
  const [show, setshow] = useState(false)
  const [flep, setflep] = useState("")

  useEffect(_ => {
    if (show === true) {
      setflep("fa-solid fa-caret-up")
    } else {
      setflep("fa-solid fa-caret-down")
    }
} ,[show])

  useEffect(_ => {
    if(localStorage.getItem("user") !== null) setuser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const handleOut = () => {
    localStorage.removeItem("todouser")
    setTimeout(() => {
      window.location.href = "/sign-in"
    }, 1000);
  }

  const [mode , setmode] = useState("light")

  return (
    <div className='header'>
      <Link to ="/">to-do list </Link>

        <div className="toggle" onClick={_=> setmode(prev => prev === "light" ? "dark" : "light")}>
          <i className="fa-solid fa-sun  sun"></i>
          <i className="fa-solid fa-moon moon"></i>
          <div className={`div`} style={{left: mode=== "light" ? "8px" : "50px"}}></div>
        </div>

        <Link onClick={handleOut} >Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i></Link>
    </div>
  )
}

export default Header