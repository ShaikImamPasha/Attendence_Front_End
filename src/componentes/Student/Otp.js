import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Otp=()=>{
  var socket=io("http://localhost:3000")
    const [loading,setLoading]=useState(true);
    const [Otp,setOtp]=useState()
    const studentData=useSelector((state)=>state.student.StudentData)



    useEffect(()=>{
       socket.emit("sendEmailAndGenerateOTP",{mail:"shaikimam916@gmail.com"})  
       socket.on("OTPstatus",(data)=>{
           if(data.status){
            setLoading(false)
           }
           else{
            setLoading(null)
           }
       })
       
    },[])
    
  function enterOtp(){
    ;
      socket.emit("verifyMailandProvideAttendence",{enteredNumber:Otp,enteredMail:studentData.userData.mail,enteredSection:studentData.userData.section})
      socket.on("verifyOTPResult",(data)=>{
    
      })
   }

    if(loading===null) return <p>there is issue plaese try again</p>
    if(loading) return <p>plaese wait seanding otp...</p>
    return <>
          <div>
            <div>
                Enter Otp: 
            </div>
            <div>
                <input placeholder="Enter Otp" value={Otp} onChange={(e)=>setOtp(e.target.value)} type="number"></input>
                <button onClick={()=>enterOtp()}>send</button>
    
            </div>
          </div>
    </>
}
export {Otp}