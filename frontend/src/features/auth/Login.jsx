import React ,{useState}from "react";
import axios from "axios";
import { API_BASE_URL } from "../../main";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContest";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const {setIsAuth} = useAuth();
  const [pass, setPass] = useState("");

  //function to handleSignUp in backend

  const handleSignIn = async (e) => {

    e.preventDefault();
    // call backend

    try {
      const respond = await axios.post(
        `${API_BASE_URL}/api/auth/signin`,
        {
          email,
          pass,
        },
        { withCredentials: true },
      );
      setIsAuth(true);
      navigate("/")
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
          Welcome Back
        </h1>
        <p className="mb-6 text-center text-gray-400">
          Login to continue to Notes Tracker
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-600"
            
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
