import React from "react";
import { useState } from "react";
import { API_BASE_URL } from "../../main.jsx";
import axios from "axios";

export default function Signup() {
  // SingnUp mechanism
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fullName, setFullName] = useState("");

  //function to handleSignUp in backend

  const handleSignUp = async (e) => {
    e.preventDefault();
    // call backend
    try {
      const respond = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        {
          email,
          pass,
          fullName,
        },
        { withCredentials: true },
      );
      console.log(respond);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl">
        {/* Header */}
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Create Account
        </h1>
        <p className="mb-6 text-center text-gray-400">
          Start tracking your notes effortlessly
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={pass}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-600"
            
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 hover:underline">
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
