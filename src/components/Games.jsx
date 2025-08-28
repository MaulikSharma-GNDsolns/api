import React, { useState } from "react";
const Games = () => {
  const [Games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"
      );
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching joke", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen justify-center items-center bg-gradient-to-b from-lime-100 to-cyan-100">
        <h1 className="m-6 text-lime-400 text-5xl font-bold">
          Latest Game deals:
        </h1>
        <button
          className="p-6 m-6 rounded-full bg-gradient-to-b from-cyan-400 to-indigo-500 text:white hover:shadow-md shadow-slate-400 cursor-pointer disabled:cursor-not-allowed transition duration-300"
          onClick={fetchGames}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Game Deals 🎮"}
        </button>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Games.map((game) => (
            <div
              key={game.dealID}
              className="p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={game.thumb}
                alt={game.title}
                className="rounded w-full mb-3"
              />
              <h2 className="font-bold text-lg">{game.title}</h2>
              <p className="text-sm text-gray-600">
                Metacritic: {game.metacriticScore || "N/A"} | Steam:{" "}
                {game.steamRatingText || "N/A"}
              </p>
              <p className="mt-2">
                <span className="text-red-500 font-bold">
                  ${game.salePrice}
                </span>{" "}
                <span className="line-through text-gray-400">
                  ${game.normalPrice}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;
