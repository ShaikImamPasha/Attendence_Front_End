import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Otp } from './Otp';

const TeacherMarker = ({ position }) => {
  return (
    <Marker position={position}>
      <Popup>Teacher's Location</Popup>
    </Marker>
  );
};

const MapVerification = () => {
  var socket=io("http://localhost:3000");
  
socket.on("connect", () => {
  console.log("Socket connected");
});
  const [userLocation, setUserLocation] = useState([]);
  const [verificationResult, setVerificationResult] = useState(null);
  const [teampState,setTeampState]=useState(true)
  const [matcheMapState,setMatcheMapState]=useState(false);
  const studentData=useSelector((state)=>state.student.StudentData)
  const teacherLoaction=useSelector((state)=>state.student.teacherLoaction);
  const [shape,setShape]=useState(false)

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // Perform verification here
        socket.on("statusOfmapActivated",(data)=>{

          // setTeacherLocation({lat:data.attendance[0].lat,lng:data.attendance[0].lng})
                const defaultTeacherLocation = [teacherLoaction]; // Default teacher location (Tadepalligudem, Sri Vavilala Venkata Seshavataram Engg College)
               const rectangleSize = 0.000045; // approximately 5 meters in degrees
         var teacherRectangleBounds = [
                [defaultTeacherLocation[0] - rectangleSize / 2, defaultTeacherLocation[1] - rectangleSize / 2],
               [defaultTeacherLocation[0] + rectangleSize / 2, defaultTeacherLocation[1] + rectangleSize / 2],
           ];
           setShape(teacherRectangleBounds)
       const isWithinRectangle =
       userLocation.lat >= teacherRectangleBounds[0][0] &&
       userLocation.lat <= teacherRectangleBounds[1][0] &&
       userLocation.lng >= teacherRectangleBounds[0][1] &&
       userLocation.lng <= teacherRectangleBounds[1][1];
       
       setVerificationResult(isWithinRectangle);
        })
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );

  
    const teamp=setTimeout(()=>{
           if(verificationResult){
               socket.emit(("matchTheMap"),{section:studentData.userData.section, name:studentData.userData.name, mail:studentData.userData.mail })
                socket.on("matchTheMapDone",(data)=>{
                         const filterData=data.data.attendance.filter((data)=>{
                            return data.mail===studentData.userData.mail && data.isMapTrue===true
                         })
                     
                         if(filterData.length===0){
                          setMatcheMapState(false)
                         }else{
                    
                          setMatcheMapState(true)
                         }
                })
              }
    },[1000])
  
    return ()=>{
          clearTimeout(teamp)
    }
  }, []);
console.log("otpppp",matcheMapState);

if(matcheMapState) return <><Otp /></>

if(userLocation.length===0) return <p>Loading</p>
  return (
    <div>
      {verificationResult !== null && (
        <div>
          {verificationResult ? (
            <p>User is within the 5-meter rectangle of the teacher's location.</p>
          ) : (
            <p>User is not within the 5-meter rectangle of the teacher's location.</p>
          )}
        </div>
      )}
      {userLocation && (
        <MapContainer center={userLocation} zoom={16} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
          <TeacherMarker position={teacherLoaction} />
          {shape && <Rectangle bounds={shape} color="red" />}
        </MapContainer>
      )}
    </div>
  );
};

export { MapVerification };
