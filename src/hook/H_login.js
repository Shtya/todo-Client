import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../redux/S_auth';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const H_Login = () => {
  const dispatch = useDispatch()
  const Navigat = useNavigate()

  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [isload, setisload] = useState(true)
  const [animation, setanimation] = useState(true)
  
  
  const Auth = useSelector(state => state.SliceAuth.auth)
  const handleSub = async(e) => { 
    e.preventDefault()
    if (email == "") return toast.error("ادخل الايميل")
    if (password == "") return toast.error("ادخل الرقم السري")

    setisload(true)
    await dispatch(Login({password , email}))
    setisload(false)
  }

  useEffect(_ => {
    if (isload === false) {
      if (Auth && Auth._err &&Auth._err[0].msg) {
        toast.error(Auth._err[0].msg)
      } else {
        toast.success("تم تسجيلك بنجاح")
        localStorage.setItem("token", Auth.token)
        localStorage.setItem("user", JSON.stringify(Auth.data))
        setanimation(false)
        setTimeout(() => {
          Navigat("/")
          window.location.reload(false)
        }, 1500);
      }
    }
  } , [isload])

  return [ setemail , setpassword  ,password , email  , handleSub , animation]
}

export default H_Login