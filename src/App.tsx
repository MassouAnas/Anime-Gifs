//https://nekos.best/api/v2/{verb}

import { useEffect, useState } from "react";
import AppGif from "./components/AppGif";
import { GifType, Gifreponse } from "./types/gifType";
import { verbs } from "./Data/verb";

// possible verbs : {baka, bite, blush, bored, cry, cuddle, dance, facepalm, feed, handhold, handshake, happy, highfive, hug, kick ,kiss, laugh, lurk, nod, nom, nope, pat, peck, poke, pout, punch, shoot, shrug, slap, sleep, smile, smug, stare, think, thumbsup, tickle, wave, wink, yawn, yeet}

function App() {
  const [gif, setGif] = useState<GifType>({ anime_name: "", url: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verb, setVerb] = useState("Baka");
  const [Gen, setGen] = useState(1);
  useEffect(() => {
    console.log("component mounted");
    async function getNeko() {
      setGif({ anime_name: "", url: "" });
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://nekos.best/api/v2/${verb}`);
        if (response.ok) {
          const json: Gifreponse = await response.json();
          setGif(json.results[0]);
          setLoading(false);
        } else {
          setError("There was an error getting your gif");
          setLoading(false);
        }
      } catch (e) {
        const error = e as Error;
        setError(`There was an error fetching your Gif ${error}`);
        setLoading(false);
      }
    }
    getNeko();
  }, [verb, Gen]);

  return (
    <div className="container">
      {error && (
        <article style={{ backgroundColor: "red", color: "white" }}>
          {error}
        </article>
      )}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <br />
          <h1>Anime gifs</h1>
          <select onChange={(event) => setVerb(event.target.value)}>
            <option>Select an option for the GIF you want</option>
            {verbs.map((verb) => (
              <option key={verb} value={verb}>
                {verb}
              </option>
            ))}
          </select>
          <AppGif key={gif.anime_name} Gif={gif} verb={verb} />
          <button onClick={() => setGen((prev) => prev + 1)}>
            Generate another GIF
          </button>
        </>
      )}
    </div>
  );
}

export default App;
