import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useState,useEffect } from "react";
import {addStudentData} from "../../utilles/ReaduxToolkit/StudentSlice" 
const socket = io('https://sure-wildcat-pasha.koyeb.app/');

const LoginForm = ({ userType,isStudentMode }) => {
    const [userMail,setUserMail]=useState("")
    var dispatch=useDispatch()
    const [userPasword,setUserPasword]=useState("");
    const navgator=useNavigate();
    
  useEffect(()=>{

  },[])
  function adminLogin(){
    socket.emit("LoginAdmin",{enteredMail:userMail,enteredPassword:userPasword})
    socket.on("LoginStatus",(data)=>{
      var teampdata=JSON.parse(data);
      if(teampdata.status==true){
        navgator("/AdminPage")
      }
      else{
        console.log("mail or pasword wrong");
      }
    })
  }
  function studentLogin(){
    socket.emit("LoginStudent",{enteredMail:userMail,enteredPassword:userPasword})
    socket.on("LoginStatus",(data)=>{
      var teampdata=JSON.parse(data);
  
      if(teampdata.status==true){
        dispatch(addStudentData(teampdata))
        navgator("/StudentPosrtel")
      }
      else{
        console.log("mail or pasword wrong");
      }
    })
  }
  return (
    <form onSubmit={(e)=>e.preventDefault()}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          {userType} Mail Id:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder={`${userType} Mail ID`}
          value={userMail}
          onChange={(e)=>setUserMail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Password:
        </label>
        <input
          type="password"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Password"
          onChange={(e)=>setUserPasword(e.target.value)}
        />
      </div>
      <button  onClick={()=>isStudentMode?studentLogin():adminLogin()}
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {userType} Login
      </button>
    </form>
  );
};
export {LoginForm}