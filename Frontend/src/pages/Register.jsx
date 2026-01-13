import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

const Register = () => {
  const [ firstname, setFirstname ] = useState("");
  const [ lastname, setLastname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        firstname,
        lastname,
        email,
        password
    };
    
    try{
        const res = await axios.post("http://localhost:3000/user/register", payload);
        alert(res.data.message);
        navigate("/user/login");
    } catch(err){
        console.log(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Create an Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e)=>setFirstname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e)=>setLastname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md
                         text-lg font-medium hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="col-span-2 text-center mt-2">
            <p className="text-gray-600">
              Already a user?{" "}
              <Link to="/user/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
