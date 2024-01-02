import { useEffect, useState } from "react";
import { MapVerification } from "./index"
import { io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { addsetMapActiveState,addTeacherLoaction } from "../../utilles/ReaduxToolkit/StudentSlice";
import { addTeacherLoaction } from "../../utilles/ReaduxToolkit/StudentSlice";

const EnterAttendence=()=>{
   const studentLoginData=useSelector((state)=>state.student.StudentData);
   const [mapActiveState,addsetMapActiveState]=useState(true);
   const [studentAttendence,setStudentAttendence]=useState();
  const dispatch=useDispatch()
  var socket=io("https://sure-wildcat-pasha.koyeb.app/");

  useEffect(()=>{
    console.log("useefefct");
       socket.on("statusOfmapActivated",(data)=>{

          addTeacherLoaction([data.attendance[0].lat,data.attendance[0].lng])
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
        console.log("ini",data);
         if(data.period1===true){
            setStudentAttendence(false);
         }
       })
       socket.on("verifyOTPResult",(data)=>{
         if(data.success===true){
            setStudentAttendence(false);
         }
       })
  },[studentAttendence,mapActiveState])
console.log("Adadaddad");
   if(studentAttendence===false) return <p>attendance done</p>
   if(mapActiveState===true) return <p>pls wait for enable the attendance </p>
    return <>
    <div className="">
    <MapVerification />
    </div>
    </>
}
export {EnterAttendence}