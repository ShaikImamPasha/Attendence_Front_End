import React, { useEffect, useState } from 'react';
import { LoginForm } from './index';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [isStudentMode, setIsStudentMode] = useState(true);
   const dispatch=useDispatch();

  const toggleMode = () => {
    setIsStudentMode((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {/* Render login form based on mode */}
        {isStudentMode ? (
          <LoginForm userType="Student" isStudentMode={isStudentMode}/>
        ) : (
          <LoginForm userType="Admin" isStudentMode={isStudentMode}/>
        )}
        {/* Toggle button to switch between admin and student modes */}
        <div className="mt-4">
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isStudentMode ? 'Switch to Admin' : 'Switch to Student'}
          </button>
        </div>
      </div>
    </div>
  );
};

export {LoginPage};
