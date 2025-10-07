import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/enrollments/courses/${id}/enroll`);
      setMessage("✅ Enrollment successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Enrollment failed ❌");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-300">Loading...</p>;
  if (!course)
    return <p className="text-center mt-10 text-gray-400">Course not found</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-3">
          {course.title}
        </h1>
        <p className="text-gray-300 leading-relaxed">{course.description}</p>

        <div className="mt-6 space-y-2 text-gray-400">
          <p>
            <strong className="text-cyan-400">Instructor:</strong>{" "}
            {course.instructor?.name || "Unknown"}
          </p>
          <p>
            <strong className="text-cyan-400">Students Enrolled:</strong>{" "}
            {course.studentsCount || 0}
          </p>

          {user && user.role === "instructor" && (
            <Link
              to={`/courses/${id}/students`}
              className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 underline transition"
            >
              View Enrolled Students
            </Link>
          )}
        </div>

        {user && user.role === "student" && (
          <button
            onClick={handleEnroll}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold  p-2"
          >
            Enroll Now
          </button>
        )}

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("successful")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
