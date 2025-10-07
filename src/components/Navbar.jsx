import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        MERN Academy
      </Link>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link to="/courses">Courses</Link>
        {user && user.role === "student" && (
          <>
            <Link to="/enrollments/me">My Courses</Link>
            <Link to="/recommendations">AI Suggestions</Link>
          </>
        )}
        {user && user.role === "instructor" && (
          <Link to="/courses/add" className="bg-green-500 px-2 py-1 rounded">
            + Add Course
          </Link>
        )}
        {user ? (
          <>
            <span className="font-semibold">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
