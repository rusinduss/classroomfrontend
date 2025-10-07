import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/courses?q=${search}`);
        setCourses(res.data.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [search]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id)); // remove from UI
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting course", err);
      alert("Failed to delete course.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">All Courses</h1>

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-600 p-2 w-full mb-6 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {courses.length === 0 ? (
          <p className="text-center text-gray-400">No courses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition bg-gray-900"
              >
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                  {course.description}
                </p>

                <div className="mt-3">
                  <Link
                    to={`/courses/${course._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>

                {user && user.role === "instructor" && (
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/courses/${course._id}/edit`}
                      className="bg-yellow-400 px-2 py-1 rounded text-black hover:bg-yellow-500 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
