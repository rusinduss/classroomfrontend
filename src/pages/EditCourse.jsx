import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const c = res.data;
        setFormData({
          title: c.title,
          description: c.description,
          tags: c.tags ? c.tags.join(", ") : "",
          published: c.published,
        });
      } catch (err) {
        console.error("Error fetching course", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };
      await api.put(`/courses/${id}`, payload);
      alert("Course updated successfully!");
      navigate("/courses");
    } catch (err) {
      console.error("Error updating course", err);
      alert("Update failed.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 border p-6 rounded-lg shadow bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-800 text-white"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <label>Published</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
