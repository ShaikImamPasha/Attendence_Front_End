import { useEffect, useState } from "react"
import { io } from "socket.io-client";
const EnableMap=()=>{
    const [EnableMap,setEnableMap]=useState(false);
    const [latlng,setLatLng]=useState(null);
      useEffect(()=>{
         navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatLng({lat:position.coords.latitude,lng:position.coords.longitude})
            },
            (error) => console.error(error),
            { enableHighAccuracy: true }
          );
      },[])


   const enableMapFun=()=>{
        setEnableMap(!EnableMap);
 
   const socket=io("https://sure-wildcat-pasha.koyeb.app/");
   socket.emit("activateMap",{lat:latlng.lat,lng:latlng.lng,section:"d",Enable:!EnableMap})
   socket.on("statusOfmapActivated",(data)=>{
     
   })
    }

   
    if(latlng===null) return <p>loading</p>
    return <>

       <button onClick={()=>enableMapFun()}>Enable</button>
       {EnableMap?<p>done</p>:<p>disable</p>}
    </>
}
export {EnableMap}