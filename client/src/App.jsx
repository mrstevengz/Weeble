import { useState } from 'react'
import './styles/App.css'
import Loading from './pages/Loading.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import charsApi from './services/charsApi.js'



function App() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  return (
    <BrowserRouter> 
      <Routes>
        <Route path = "/" element =
        {<Loading 
        setLoading={setLoading} 
        setCharacters={setCharacters}
        setError = {setError}
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
