import { use, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import charsApi from '../services/charsApi'

function Loading({
    setCharacters, setLoading, setError, 
    loading, error}) {

        const navigate = useNavigate()

        useEffect(() => {
            async function loadChars() {
                try {
                    setLoading(true)

                    const data = await charsApi.getCharacters()
                    setCharacters(data)
                } catch (error) {
                    console.log(error);
                    setError("Failed to load characters")
                } finally {
                    setLoading(false)
                }
            }
            loadChars()
        }, [])

        function enterApp() {
            navigate("/home")
        }

        return(
            <section className='loading-page'>
                <h1>Weeble</h1>
                <h2>Guess the anime character</h2>
                {error && <p>{error}</p>}
                
                <button disabled = {loading} onClick={enterApp}>{loading ? "Loading..." : "Enter App"}</button>
            </section>
        )
}

export default Loading