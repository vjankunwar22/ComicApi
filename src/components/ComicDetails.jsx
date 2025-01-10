import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const ComicDetails = () => {
  const { id } = useParams(); // Get comic ID from the URL
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      const publicKey = "36e5c3054b58d9f40f12da99a916e19a";
      const privateKey = "6b333a4c18740e862087007e7b0aec4cd9dfc107";
      const ts = Date.now().toString();
      const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setComic(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching comic details:", error);
      }
    };

    fetchComicDetails();
  }, [id]);

  if (!comic) return <p className="text-center text-xl pt-20">Loading...</p>;

  return (
    <div className="container flex justify-center items-center mx-auto h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">{comic.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="w-full rounded-lg shadow-md h-[380px] object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <p className="text-white">{comic.description || "No description available."}</p>
            <div className="border-t pt-4 space-y-2">

              <p className="text-white"><span className="font-semibold">Issue Number:</span> {comic.issueNumber}</p>
              <p className="text-white"><span className="font-semibold">Page Count:</span> {comic.pageCount}</p>
              <p className="text-white">
                <span className="font-semibold">Creators:</span>{" "}
                {comic.creators.items.map((creator) => creator.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;
