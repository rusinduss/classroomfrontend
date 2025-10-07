import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  // Redirect non-instructors
  if (!user || (user.role !== "instructor" && user.role !== "admin")) {
    return <p className="text-center mt-10 text-red-500">Access denied.</p>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      await api.post("/courses", payload);
      setMessage("Course created successfully!");
      setTimeout(() => navigate("/courses"), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-xl p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Add New Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-white">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. react, frontend, javascript"
            />
          </div>

          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <label>Publish immediately</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
            Create Course
          </button>
        </form>

        {message && <p className="mt-3 text-green-500 text-center">{message}</p>}
      </div>
    </div>
  );
}
