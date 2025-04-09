import React from "react";
import { useEffect, useState } from "react";
import MovieComponent from "./MovieComponents";
import Loading from "./Loading";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCardData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    // setCard(data);
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
    console.log(...data);
  };

  const handleInfiniteScroll = async () => {
    try {
      // console.log("FullHeight", document.documentElement.scrollHeight);
      //returns the height of the entire document, in pixels.

      // console.log("innerHeight", window.innerHeight);
      //t returns the inner height of the window (the height of the browser window's viewport), in pixels.

      // console.log("scrollHeight", document.documentElement.scrollTop);
      //returns the number of pixels that the document has been scrolled vertically.
      if (
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;
