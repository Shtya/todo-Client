import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../redux/S_auth';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const H_SignUp = () => {
  const dispatch = useDispatch()
  const Navigat = useNavigate()

  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [password1, setpassword1] = useState("")
  const [email, setemail] = useState("")
  const [isload, setisload] = useState(true)
  
  
  const Auth = useSelector(state => state.SliceAuth.auth)
  const handleSub = async (e) => { 
    e.preventDefault()
    if (name === "") return toast.error("ادخل الاسم")
    if (email === "") return toast.error("ادخل الايميل ")
    if (password === "") return toast.error("ادخل الرقم السري ")
    if (password !== password1) return toast.error("برجاء تأكيد الرقم السري  ")
    
    setisload(true)
    await dispatch(Register({name , password  , email}))
    setisload(false)
  }

  useEffect(_ => {
    if (isload === false) {
      if (Auth && Auth._err &&Auth._err[0].msg) {
        toast.error(Auth._err[0].msg)
      } else {
        toast.success("تم تسجيلك بنجاح")
        setTimeout(() => {
          Navigat("/login")
        }, 1500);
      }
    }
  } , [isload])

  return [ setname ,setemail , setpassword , setpassword1 ,name , email , password ,password1 , handleSub]
}

export default H_SignUp