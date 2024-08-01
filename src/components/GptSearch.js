import { BG_URL } from "../utils/constants";
import React, { useState } from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { useSelector } from 'react-redux'
import GPTKey from './GptKey'
import MessageDiv from './MessageDiv'

const GPTSearch = () => {

const key = useSelector(store => store.gpt.key);
const [message, setMessage] = useState(null);
return (
    <div className='bg-slate-950 w-full min-h-screen '>
        <div className='pt-36'>
            {
                key ?
                    <>
                        <GptSearchBar apiKey={key} setMessage={setMessage} />
                        <GptMovieSuggestions/>
                    </> : <GPTKey setMessage={setMessage} />
            }
            {
                message && <MessageDiv message={message} />
            }
        </div>
    </div>
)
}
export default GPTSearch;