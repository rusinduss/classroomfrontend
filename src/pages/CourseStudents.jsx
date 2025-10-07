import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function CourseStudents() {
  const { id } = useParams(); // courseId
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/enrollments/courses/${id}/students`);
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students", err);
      } finally {
        setLoading(false);
      }
    };
    if (user && (user.role === "instructor" || user.role === "admin")) {
      fetchStudents();
    }
  }, [user, id]);

  if (!user || (user.role !== "instructor" && user.role !== "admin"))
    return <p className="text-center mt-10 text-red-500">Access denied.</p>;

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Students Enrolled</h1>

      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="border p-2">{s.user?.name}</td>
                <td className="border p-2">{s.user?.email}</td>
                <td className="border p-2">{s.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
