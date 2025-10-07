import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Recommendations() {
  const { user } = useContext(AuthContext);
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendations([]);
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/gpt/recommendations", { prompt, limit: 5 });
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "student")
    return <p className="text-center mt-10 text-red-500">Access denied.</p>;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          AI Course Recommendations
        </h1>
        <p className="mb-4 text-gray-400 text-center">
          Tell us your goal or what you want to learn — AI will suggest the best
          matching courses!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder='e.g. "I want to become a full stack developer"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 font-semibold"
          >
            {loading ? "Thinking..." : "Get Recommendations"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6">
          {recommendations.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-white">
                Recommended Courses ({recommendations.length})
              </h2>
              <ul className="space-y-3">
                {recommendations.map((r, i) => (
                  <li
                    key={i}
                    className="border border-gray-700 rounded-lg p-4 bg-gray-800 hover:shadow-lg transition"
                  >
                    <p className="font-bold text-white">{r.title || "Untitled Course"}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {r.reason || "No description provided"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
