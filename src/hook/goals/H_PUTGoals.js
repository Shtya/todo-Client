import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_Goals, PUT_Goals } from '../../redux/S_Goals'
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const H_PUTGoals = () => {
  const [namePut, setnamePut] = useState("")
  const [isload, setisload] = useState(true)
  const [GoalID , setGoalID] = useState("")
  const dispatch = useDispatch()
  console.log(GoalID)
  
  const handlePut = async() => {
    if (namePut === "") return toast.error("من فضلك اضف اسم الهدف")
    setisload(true)
    await dispatch(PUT_Goals({id:GoalID , text : namePut}))
    setisload(false)
    console.log(GoalID)
  }

  useEffect(_ => {
    if (isload === false) {
      toast.success("تم تعديل الهدف بنجاح")
      setTimeout(() => {
        window.location.reload(false)
      }, 1000);
    }
  }, [isload])
  
  return [setGoalID , setnamePut , namePut , handlePut]
}

export default H_PUTGoals