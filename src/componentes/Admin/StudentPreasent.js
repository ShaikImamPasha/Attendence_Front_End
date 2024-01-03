import { useEffect, useState } from "react"
import {MiniAttenetendce} from "./index"

const StudentPreasent=()=>{
    const [studentdata,setStudentData]=useState([]);
    useEffect(()=>{
       setInterval(async()=>{
        var res=await fetch("https://sure-wildcat-pasha.koyeb.app/getStudentDestailes");
        res=await res.json()
        setStudentData(res.data)
        console.log(res)
       },3000)
    },[studentdata])
    if(studentdata.length===0) return <p>wait...</p>
    return <>
      <div>
        {studentdata.map((data)=>{
          console.log("adad",data);
            return <>
               <MiniAttenetendce attendence={data.attendance} section={data.section}/>
            </>
        })}
      </div>
    </>
}
export {StudentPreasent}