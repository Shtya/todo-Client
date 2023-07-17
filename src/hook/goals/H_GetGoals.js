import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_Goals, POST_Goals } from '../../redux/S_Goals'
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const H_GetGoals = () => {

  const [isload, setisload] = useState(true)
  
  const dispatch = useDispatch()
  const goals = useSelector(state => state.SliceGoals.goals)
  const load = useSelector(state => state.SliceGoals.load)

  useEffect(_ => {
    dispatch(GET_Goals())
  }, [])
  
  return [load , goals]
}

export default H_GetGoals