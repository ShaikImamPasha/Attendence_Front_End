import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Otp } from './Otp';
// Import Leaflet CSS at the top of your file
import 'leaflet/dist/leaflet.css';
const socket = io("https://sure-wildcat-pasha.koyeb.app/");

const TeacherMarker = ({ position }) => (
  <Marker position={position}>
    <Popup>Teacher's Location</Popup>
  </Marker>
);

const MapVerification = () => {
  const [userLocation, setUserLocation] = useState([]);
  const [verificationResult, setVerificationResult] = useState(false);
  const [matcheMapState, setMatcheMapState] = useState(false);
  const studentData = useSelector((state) => state.student.StudentData);
  const teacherLocation = useSelector((state) => state.student.teacherLoaction);
  const [shape, setShape] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
     
    const defaultTeacherLocation = [teacherLocation.lat,teacherLocation.lng];
    const rectangleSize = 0.000333; // approximately 10 meters in degrees
    const teacherRectangleBounds = [
      [defaultTeacherLocation[0] - rectangleSize / 2, defaultTeacherLocation[1] - rectangleSize / 2],
      [defaultTeacherLocation[0] + rectangleSize / 2, defaultTeacherLocation[1] + rectangleSize / 2],
    ];
    setShape(teacherRectangleBounds);
    const isWithinRectangle =
    userLocation.lat >= teacherRectangleBounds[0][0] &&
    userLocation.lat <= teacherRectangleBounds[1][0] &&
    userLocation.lng >= teacherRectangleBounds[0][1] &&
    userLocation.lng <= teacherRectangleBounds[1][1];

    setVerificationResult(isWithinRectangle)

    const timeoutId = setTimeout(() => {
      if (verificationResult) {
        socket.emit("matchTheMap", { section: studentData.userData.section, name: studentData.userData.name, mail: studentData.userData.mail });
        socket.on("matchTheMapDone", (data) => {
          const filterData = data.data.attendance.filter((item) => item.mail === studentData.userData.mail && item.isMapTrue === true);

          if (filterData.length === 0) {
            setMatcheMapState(false);
          } else {
            setMatcheMapState(true);
          }
        });
      }
    }, 1000);

    // Cleanup function to clear the timeout on component unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [verificationResult, studentData.userData.mail, teacherLocation.lat, teacherLocation.lng,teacherLocation]);
  console.log("reeeeee",verificationResult);
  if (matcheMapState) return <Otp />;

  if (userLocation.length === 0) return <p>Loading</p>;

  return (
    <div>
      {
        <div>
          {verificationResult===true ? (
            <p>User is within the 10-meter rectangle of the teacher's location.</p>
          ) : (
            <p>User is not within the 10-meter rectangle of the teacher's location.</p>
          )}
        </div>
      }
      {userLocation && (
        <MapContainer center={userLocation} zoom={16} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        
          {shape && <Rectangle bounds={shape} color="red" />}
        </MapContainer>
      )}
    </div>
  );
};

export { MapVerification };
