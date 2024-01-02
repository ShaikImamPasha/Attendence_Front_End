import { Link,Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
const StudentPosrtel=()=>{
  var studentData=useSelector((state)=>state.student.StudentData);
  const navgator=useNavigate();
  const [studentDta,setUserData]=useState(studentData);

  useEffect(()=>{
    if(studentData.userData===undefined){
      alert("pleasee Login Again"); 
      navgator("/LoginPage") 
    }
  },[studentData])
    return <>
      <>
        <div>
           <div>
                 <Link to={"/StudentPosrtel/StudentProfile"}>
                      Student Profile
                 </Link>
           </div>
           <div>
            <Link to={"/StudentPosrtel/EnterAttendence"}>
              <div>
                Enter Attendence
              </div>
            </Link>
           </div>
           <div>
            <Outlet />
           </div>
        </div>
      </>
    </>
}
export {StudentPosrtel}