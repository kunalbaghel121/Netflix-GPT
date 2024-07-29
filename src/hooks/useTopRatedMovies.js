import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTopRatedMovies} from '../utils/moviesSlice'
import { useEffect } from 'react'
  
const useTopRatedMovies= ()=>{

      //fetch data from tmdb api and update store
  const dispatch=useDispatch();


  const getTopRatedMovies= async()=>{
    const data= await fetch("https://api.themoviedb.org/3/movie/top_rated", API_OPTIONS);
    const json = await data.json();
    // console.log(json);
    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(()=>{

    getTopRatedMovies();

  },[])



}

export default useTopRatedMovies;
