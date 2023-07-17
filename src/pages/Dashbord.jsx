import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../config/API';
import {Error, success} from "../component/Notification"
import { DeleteToDo, GetToDo, PostToDo, PutComplete, PutToDo } from '../redux/S_Goals';
import { Link } from 'react-router-dom';
const Dashbord = () => {

  const [anyChange , setanyChange] = useState(true)
  const [user ,setuser] = useState(null)
  const [showtodo , setshowtodo] = useState("")
  const [isload , setisload] = useState(true)
  const [text , settext] = useState("")
  const dispatch = useDispatch()
  
  const handleSub = async()=>{
    if(user === null) return Error("please login and try again")
    if(text === "") return Error("text is required ")
    setisload(true)
    dispatch(PostToDo({text:text}))
    setisload(false)
    settext(" ")
  }
  console.log(user);
  // ====> get todos
  useEffect(_=>{ dispatch(GetToDo())} ,[anyChange])
  const {todo , isloading} = useSelector(e => e.SliceGoals)
  
  
  // ====> delete todos
  const handleDelete = async(e)=>{
    await dispatch(DeleteToDo(e?._id))
    setanyChange(!anyChange)
  }


  // ====> Edite todos
  const [showInput , setshowInput] = useState(false) 
  const [editeText, setediteText] = useState()
  const [idTodo , setidTodo] = useState("")

  const handlePut = async(e)=>{
    const res = todo?.data.find(ele => ele?._id === e?._id)
    setediteText(res?.text)
    setshowInput(!showInput)
    setidTodo(e?._id)
    dispatch(PutToDo({id:e?._id , send:editeText }))
  }


  // On Press Enter 
  const handleSubDown = (e) =>  e.key === "Enter" && handleSub()



  // Get Complete 
  const [complete , setcomplete] = useState()
  const config = {
    headers :{Authorization : `Bearer ${ localStorage.getItem("todouser") && JSON.parse(localStorage.getItem("todouser"))?.token }`}
  }
  useEffect(_=> {  } ,[])
  useEffect(_=>{
    baseURL.get(`/api/goals?complete=true`,config).then(res => setcomplete(res.data)).catch(err=> setcomplete(err.response.data))
  } ,[anyChange])



  // Add Complete
  const handleComplete = async(e)=>{
    await baseURL.put(`/api/goals/MoveToDone/${e?._id}`  ,config).then(res => res.data).catch(err=> err.response.data)
    setanyChange(!anyChange)
    
  }

  // Log Out
  useEffect(_ => {
    if(localStorage.getItem("todouser")) setuser(JSON.parse(localStorage.getItem("todouser"))) 
  }, [])

  const handleOut = () => {
    localStorage.removeItem("todouser")
    setTimeout(() => {
      window.location.href = "/sign-in"
    }, 1000);
  }

  return (
    <div className='home'>

      <Link onClick={handleOut} className='logout' > <i className="fa-solid fa-arrow-right-from-bracket"></i></Link>

      <div className="contain">
        <h2>Todo App</h2>

        <div className="box">
          <input onKeyDown={handleSubDown} value={text} onChange={e=> settext(e.target.value)} type="text" placeholder='Add your new todo' />
          <i onClick={handleSub} className="fa-solid fa-plus"></i>
        </div>

       {
        todo?.data?.map((e,index)=> (
          
        <div className={`item ` }key={index}>
          <div onClick={_=>handleComplete(e)} className="empty"><span> <i className="fa-solid fa-check"></i> </span></div>
          
          {showInput === true && idTodo === e?._id ? <input  value={editeText} onChange={e=> setediteText(e.target.value)} className='editetodo' placeholder='Edite your todo' /> : <p onClick={_=>setshowtodo(pre => pre === "" ? "show" : "") } className={showtodo} >{e.text}</p> }
          <div onClick={_=> handlePut(e )} className='icon'> {showInput === true && idTodo === e?._id ?  <i className="fa-solid fa-paper-plane"></i>:  <i  className="fa-solid fa-pen fa-fw"></i>} </div>
          <div onClick={_=> handleDelete(e)} className='icon'> <i className="fa-solid fa-trash fa-fw"></i></div>
        </div>
        ))
        
      } 




      </div>

      {
        complete?.data?.length >= 1 &&
        <div className="contain2">
      {
        complete?.data?.map((e,index) =>(

      <div className={`item `} key={index}>
          <div  className="empty"><span> <i className="fa-solid fa-check"></i>  </span></div>
          <p onClick={_=>setshowtodo(pre => pre === "" ? "show" : "") } className={showtodo}>{e.text}</p>
          <div onClick={_=>handleComplete(e)} className='icon'> <i className="fa-solid fa-share"></i></div>
          <div onClick={_=> handleDelete(e)} className='icon'> <i className="fa-solid fa-trash fa-fw"></i></div>
        </div>

        ))
      }
      </div>
      }

        
    </div>
  
  )
}

export default Dashbord