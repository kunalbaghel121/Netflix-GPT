import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";


const useMovieTrailer = (movieId) =>{


    const trailerVideo= useSelector(store=> store.movies?.trailerVideo)
    const dispatch=useDispatch();


    const getMoviesVideos= async()=>{
   
        const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos",API_OPTIONS)
        const json = await data.json();
        // console.log(json);
    
        const filterData= json.results?.filter((video)=>video.type==="Trailer");
        const trailer = filterData?.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    
      }
    
      useEffect(()=>{
        getMoviesVideos();
    
      },[])




}

export default useMovieTrailer;