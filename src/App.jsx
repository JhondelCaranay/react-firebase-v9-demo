import { createRef, useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { ref, uploadBytes } from "firebase/storage";
import useMovies from "./hooks/firebase/useMovies";
import { storage } from "./config/firebase";

function App() {
  // allow update, delete : if request.auth != null && request.auth.uid == request.resource.data.userId;

  const { movieList, createMovie, deleteMovie, updateMovieTitle } = useMovies();

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");
  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);
  const fileUploadRef = createRef();
  // create new movie
  const onSubmitMovie = async () => {
    await createMovie(newMovieTitle, newReleaseDate, isNewMovieOscar);

    // reset state
    setNewMovieTitle("");
    setNewReleaseDate(0);
    setIsNewMovieOscar(false);
  };

  // handle delete movie
  const handleDeleteMovie = async (id) => {
    await deleteMovie(id);
  };

  // handle update movie
  const handleUpdateMovie = async (id) => {
    await updateMovieTitle(id, updatedTitle);
    // reset state
    setUpdatedTitle("");
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    console.log("====================================");
    console.log("fileUpload", fileUpload);
    console.log("====================================");
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      fileUploadRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl w-full h-full mx-auto bg-slate-800 text-white p-10">
      <Auth />

      <div className="bg-slate-700 rounded p-10 flex gap-5 items-center">
        <input
          className="bg-slate-500 rounded p-5 flex flex-col gap-5"
          placeholder="Movie title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className="bg-slate-500 rounded p-5 flex flex-col gap-5"
          placeholder="Release Date..."
          type="number"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          className="bg-slate-500 rounded p-5 flex flex-col gap-5 w-10 h-10 "
          type="checkbox"
          checked={isNewMovieOscar}
          // canChange={true}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button className="bg-slate-500 rounded p-5 flex flex-col gap-5" onClick={onSubmitMovie}>
          Submit Movie
        </button>
      </div>
      <div className="bg-slate-700 rounded p-10 flex gap-5 flex-col">
        {movieList.map((movie) => (
          <div key={movie.id} className="bg-slate-600 rounded p-5 flex justify-between gap-5">
            <div className="flex flex-col gap-5">
              <h1
                className="text-2xl font-bold cursor-pointer"
                style={{ color: movie.receivedAnOscar ? "green" : "red" }}
              >
                {movie.title}
              </h1>
              <p className="text-xl font-bold cursor-pointer"> Date: {movie.releaseDate} </p>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className="bg-slate-500 rounded p-5 flex flex-col gap-5"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete Movie
              </button>

              <input
                className="bg-slate-500 rounded p-5 flex flex-col gap-5"
                placeholder="new title..."
                defaultValue={movie.title}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
                className="bg-slate-500 rounded p-5 flex flex-col gap-5"
                onClick={() => handleUpdateMovie(movie.id)}
              >
                Update Title
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-700 rounded p-10 flex gap-5 items-center">
        <input
          ref={fileUploadRef}
          className="bg-slate-500 rounded p-5 flex flex-col gap-5"
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button className="bg-slate-500 rounded p-5 flex flex-col gap-5" onClick={uploadFile}>
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;
