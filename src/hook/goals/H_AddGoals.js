import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_Goals } from '../../redux/S_Goals'
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const H_AddGoals = () => {
  const [user, setuser] = useState("")
  const [name, setname] = useState("")
  const [isload, setisload] = useState(true)
  
  useEffect(_ => {
    if (localStorage.getItem("user") !== null) {
      setuser( JSON.parse(localStorage.getItem("user")))
    }
  }, [])
  
  const dispatch = useDispatch()
  const goals = useSelector(state => state.SliceGoals.goals)
  const load = useSelector(state => state.SliceGoals.load)

  const handleSub = async() => {
    if (name === "") return toast.error("من فضلك اضف اسم الهدف")
    setisload(true)
    await dispatch(POST_Goals({text : name}))
    setisload(false)
  }

  useEffect(_ => {
    if (isload === false) {
      setname("")
      toast.success("تم اضافه الهدف بنجاح")
      setTimeout(() => {
        window.location.reload(false)
      }, 1000);
    }
  }, [isload])
  
  return [user , name , setname , handleSub]
}

export default H_AddGoals