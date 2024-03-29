import React, { Children } from "react";
import ReactDom from "react-dom/client";
import { Adminpage,CreateAccount,EnableMap } from "../src/componentes/Admin/index";
import { LoginPage } from "./componentes/LoginPage";
import { RouterProvider,Outlet,createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utilles/ReaduxToolkit/appstore";
import { EnterAttendence, StudentPosrtel,StudentProfile } from "./componentes/Student/index";


const App=()=>{
    return <>
      <Provider store={appStore}>
            <LoginPage />
      </Provider>
    </>
}
const AppLayOut=createBrowserRouter([
    {
        path:"/",
        element:<App />,
    },
        {
                path: "/AdminPage",
                element: <Provider store={appStore}><Adminpage /></Provider> ,
                children:[
                {
                    path:"/AdminPage/createAccount",
                    element:<CreateAccount />
                },
                {
                    path:"/AdminPage/EnableMap",
                    element:<EnableMap />
                }
               ]
            },
            {
                path:"/StudentPosrtel",
                element:<Provider store={appStore}><StudentPosrtel /></Provider>,
                children:[
                    {
                        path:"/StudentPosrtel/EnterAttendence",
                        element:<EnterAttendence />
                    },{
                         path:"/StudentPosrtel/StudentProfile",
                         element: <StudentProfile />
                    }
                ]
            }
    
])
var id=document.getElementById("root");
var root=ReactDom.createRoot(id);
root.render(<RouterProvider router={AppLayOut}/>)