import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black  p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-[fadeInUp_1.5s_ease-in-out_forwards]">
        Welcome to MERN Academy
      </h1>
      <p className="text-gray-600 font-bold text-lg sm:text-xl max-w-xl text-center mb-8 animate-[fadeIn_2s_ease-in-out_forwards]">
        Learn, build, and grow with top-rated online courses.
      </p>
      {!user ? (
        <Link to={`/login`} className=" bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold p-2">
          Login
        </Link>
      ) : (
        <Link to={`/courses`} className=" bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold  p-2">
          Get Started
        </Link>
      )}
    </div>
  );
}
