import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, firestoreDb } from "../../config/firebase";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(firestoreDb, "movies");

  useEffect(() => {
    getMovieList();
  }, []);

  // get movies from firestore
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const createMovie = async (newMovieTitle, newReleaseDate, isNewMovieOscar) => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  // delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(firestoreDb, "movies", id);
    await deleteDoc(movieDoc);

    // remove from state
    const filteredMovieList = movieList.filter((movie) => movie.id !== id);
    setMovieList(filteredMovieList);
  };

  // update movie title
  const updateMovieTitle = async (id, updatedTitle) => {
    const movieDoc = doc(firestoreDb, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });

    // update state
    const updatedMovieList = movieList.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          title: updatedTitle,
        };
      }
      return movie;
    });

    setMovieList(updatedMovieList);
  };

  return { movieList, createMovie, deleteMovie, updateMovieTitle };
};
export default useMovies;
