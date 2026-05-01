import { use, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import charsApi from '../services/charsApi'

function Loading({ loading, error}) {

        const navigate = useNavigate()

        function enterApp() {
            navigate("/home")
        }

        return(
            <section className='loading-page'>
                <h1>Weeble</h1>
                <h2>Guess the anime character</h2>
                {error && <p>{error}</p>}
                
                <button disabled = {error} onClick={enterApp}>{loading ? "Loading..." : "Enter App"}</button>
            </section>
        )
}

export default Loading