import React, { useState } from "react";

export default function Joke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6">Random Joke Generator</h1>

      <button
        onClick={fetchJoke}
        disabled={loading}
        className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-medium shadow hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? "Loading..." : "Get a Joke 😂"}
      </button>

      {joke && (
        <div className="mt-6 p-5 bg-white rounded-2xl shadow max-w-md text-center">
          <p className="font-semibold">{joke.setup}</p>
          <p className="text-blue-600 mt-3">{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}
