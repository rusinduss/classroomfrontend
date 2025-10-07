import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function MyEnrollments() {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments/me");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error loading enrollments", err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === "student") fetchEnrollments();
  }, [user]);

  if (!user || user.role !== "student")
    return <p className="text-center mt-10 text-red-500">Access denied.</p>;

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">
          My Enrolled Courses
        </h1>

        {enrollments.length === 0 ? (
          <p className="text-gray-400 text-center">
            You haven’t enrolled in any courses yet.
          </p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((e) => (
              <div
                key={e._id}
                className="border border-gray-700 rounded-lg p-4 shadow-lg bg-gray-900 hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {e.course?.title || "Untitled"}
                </h2>
                <p className="text-gray-400 mt-1">{e.course?.description}</p>
                <p className="text-sm mt-2 text-gray-300">
                  <strong>Status:</strong> {e.status} |{" "}
                  <strong>Progress:</strong> {e.progress}%
                </p>
                <Link
                  to={`/courses/${e.course?._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
