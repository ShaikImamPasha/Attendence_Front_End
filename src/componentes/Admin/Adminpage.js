import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
const Adminpage=()=>{
    const navigate=useNavigate();
    const AdminData=useSelector((state)=>state)
    return <>
       <div className="flex justify-between">
             <div className="flex flex-col justify-between">
                 <Link to={"/AdminPage/createAccount"}>
                     createAccount
                 </Link>
                 <Link to={"/AdminPage/EnableMap"}>
                     Enable attendence
                 </Link>
             </div>
             <div>
                 <Outlet />
             </div>
       </div>
    </>
}
export {Adminpage}