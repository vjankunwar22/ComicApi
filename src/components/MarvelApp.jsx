import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';


const MarvelApp = () => {
  const [comics, setComics] = useState([]);


  const fetchComics = async () => {
    const publicKey = "36e5c3054b58d9f40f12da99a916e19a";
    const privateKey = "6b333a4c18740e862087007e7b0aec4cd9dfc107";
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      setComics(response.data.data.results);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);
  console.log(comics);

  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Marvel Comics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {comics.map((comic) => (
          <Link to={`/comic/${comic.id}`} key={comic.id} className="transform hover:scale-105 transition duration-200">
            <div className="bg-white rounded-lg shadow-lg h-[380px] overflow-hidden">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{comic.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarvelApp;
