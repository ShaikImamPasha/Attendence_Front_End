import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const CreateAccount = () => {
  const socket = io('http://localhost:3000');
  const [createData, setCreateData] = useState({ name: "", mail: "", section: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {

  }, [createData]);

  const createFun = () => {
 
    socket.emit("createStudentData", createData);
    socket.on("statusOfCreateStudentModel", (data) => {

      setStatusMessage(data.message);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-800">Name:</label>
            <input
              id="name"
              className="border p-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
              value={createData.name}
              required
              onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mail" className="mb-1 text-gray-800">Mail:</label>
            <input
              id="mail"
              className="border p-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
              value={createData.mail}
              required
              onChange={(e) => setCreateData({ ...createData, mail: e.target.value })}
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="section" className="mb-1 text-gray-800">Section:</label>
            <input
              id="section"
              className="border p-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
              value={createData.section}
              required
              onChange={(e) => setCreateData({ ...createData, section: e.target.value })}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-800">Password:</label>
            <input
              id="password"
              className="border p-2 transition-all duration-300 focus:outline-none focus:border-blue-500"
              value={createData.password}
              required
              onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
              type="password"
            />
          </div>
          <button
            onClick={() => createFun()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create
          </button>
          {statusMessage && <p className={`text-sm ${statusMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>{statusMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export { CreateAccount };
