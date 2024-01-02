import { useEffect, useState } from "react";
import { MapVerification } from "./index"
import { io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { addsetMapActiveState,addTeacherLoaction } from "../../utilles/ReaduxToolkit/StudentSlice";


const EnterAttendence=()=>{
   const studentLoginData=useSelector((state)=>state.student.StudentData);
   const [mapActiveState,addsetMapActiveState]=useState(true);
   const [studentAttendence,setStudentAttendence]=useState();
  const dispatch=useDispatch()


  useEffect(()=>{
     const socket=io("http://localhost:3000");
       socket.on("statusOfmapActivated",(data)=>{
         console.log("ttttt",data);
          
           const filterData=data.attendance.filter((data)=>{
                return data.mail===studentLoginData?.userData?.mail && data.mapActive===true
           })
           if(filterData.length===0){
            addsetMapActiveState(true)
           }else{
            dispatch(addTeacherLoaction({lat:data.attendance[0].lat,lng:data.attendance[0].lng}))
            addsetMapActiveState(false)
           }
       })
       socket.emit("initailStudentData",{mail:studentLoginData?.userData?.mail,section:studentLoginData?.userData?.section,name:studentLoginData?.userData?.name})
       socket.on("initailStudentResponse",(data)=>{
         if(data.period1===true){
            setStudentAttendence(true);
         }
       })
       socket.on("verifyOTPResult",(data)=>{
         if(data.success===true){
            setStudentAttendence(true);
         }
       })
  },[studentAttendence])

   if(studentAttendence) return <p>attendance done</p>
   if(mapActiveState) return <p>pls wait for enable the attendance </p>
    return <>
    <div className="">
    <MapVerification />
    </div>
    </>
}
export {EnterAttendence}