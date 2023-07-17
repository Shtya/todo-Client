import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashbord from "./pages/Dashbord";
import SignIn from "./pages/Sign-In";
import { useEffect, useState } from "react";

function App() {

  const [user , setuser] = useState()
  useEffect(_=> {localStorage.getItem("todouser") ? setuser(JSON.parse(localStorage.getItem("todouser")).data) : setuser(null)},[])

  const ProtectedRoute = ({children})=>{
    if(user === null) return <Navigate to="/sign-in" replace />
    return children
  }

  
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Dashbord /> } />
          <Route path="/sign-in" element={<SignIn />} />
          
        </Routes>

      </Router>
    </div>
  );
}

export default App;
