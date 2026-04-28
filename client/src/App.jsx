import { useState, useEffect } from 'react'
import './styles/App.css'
import Loading from './pages/Loading.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import charsApi from './services/charsApi.js'



function App() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

  return (
    <BrowserRouter> 
      <Routes>
        <Route path = "/" element =
        {<Loading 
        loading = {loading}
        error = {error}
        />}>
        </Route>

        <Route path = "/home" element =
        {<Home 
        characters ={characters} 
        />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
