import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies} from '../utils/moviesSlice'
import { useEffect } from 'react'
  
const usePopularMovies= ()=>{

      //fetch data from tmdb api and update store
  const dispatch=useDispatch();


  const getPopularMovies= async()=>{
    const data= await fetch("https://api.themoviedb.org/3/movie/popular", API_OPTIONS);
    const json = await data.json();
    // console.log(json);
    dispatch(addPopularMovies(json.results));
  }

  useEffect(()=>{

    getPopularMovies();

  },[])



}

export default usePopularMovies;
