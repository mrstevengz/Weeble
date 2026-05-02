import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import CharacterResponse from "./CharacterResponse";
import ResetModal from "./ResetModal";

function InputCharacter({ characters }) {
    //Variables para manejar los valores del API
    const [text, setText] = useState("");
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const characterList = Array.isArray(characters) ? characters : [];
    

    //Variable para manejar el abrir/cerrar del modal cuando termina un juego
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Variables para manejar la cantidad de intentos/guesses
    const MAX_GUESSES = 5;
    const currentGuessNumber = Math.min(selectedCharacters.length + 1, MAX_GUESSES);
    const [hasWon, setHasWon] = useState(false)
    const hasLost = selectedCharacters.length >= MAX_GUESSES;
    const isGameOver = hasWon || hasLost

    const response_animation_ms = 1000
    

    //Variable para almacener los valores de los personajes en un array y quitarles espacios/mayusculas
    const filteredCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(text.trim().toLowerCase())
    );

    //Variables para escoger un personaje aleatorio
    const [secretCharacter, setSecretCharacter] = useState(null)


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    //Funcion para almacenar cada personaje que se clickea a un arreglo
  async function handleSelectCharacter(character) {
    if (isGameOver) return;

    const nextCharacters = [...selectedCharacters, character];
    

    setSelectedCharacters(nextCharacters);
    setText("");
    await delay(response_animation_ms)
    correctGuess(character)
    

    if (nextCharacters.length === MAX_GUESSES) {
        setIsModalOpen(true);
        }
    }

    function correctGuess(character) {
        if(character._id === secretCharacter._id) {
            setHasWon(true)
            setIsModalOpen(true)
        }
    }

    //Funcion para empezar un nuevo juego (resetear personajes, escoger un personaje aleatorio)

    function startNewGame() {
        if (characterList.length === 0) return

        //Escoger un personaje aleatorio
        const randIndex = Math.floor(Math.random() * characterList.length)
        const randChar = characterList[randIndex]
        //Guardar el personaje en un objeto
        setSecretCharacter(randChar)
        setText("")
        setSelectedCharacters([])
        setHasWon(false)
    }


    //Cada vez que se recarga, se empieza un juego nuevo y se crea un personaje aleatorio. Eventualmente se cambiara, ya que se debe almacenar las respuestas en local storage y conservarse aunque se recarge
    useEffect(() => {
        startNewGame()
    }, [characters])


    function handleCloseModal() {
        setIsModalOpen(false)
    }
    

    return (
        <div className="main-card">
            <div className="input-container">
                <h2>Guess the character</h2>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Guess ${currentGuessNumber} of ${MAX_GUESSES}`}
                    disabled={isGameOver}
                />

                {/* Regresar la lista de personajes en la db, mientras el juego no haya terminado */}
                {!isGameOver && text.trim() && (
                    <div className="input-dropdown">
                        {filteredCharacters.length > 0 ? 
                        (filteredCharacters.map((character) =>
                            (<CharacterCard
                                key={character._id || character.name}
                                character={character}
                                onSelect={handleSelectCharacter}
                            />
                            ))
                        ) :
                        (
                            <p className="empty-state">No matching characters</p>
                        )}
                    </div>
                )}

                {/* Categorias encima de las respuestas (hard coded) */}

                {selectedCharacters.length > 0 && (
                    <div className="response-categories">
                        <h3>Name</h3>
                        <p>Series</p>
                        <p>Gender</p>
                        <p>Hair Color</p>
                    </div>
                )}

                {/* Respuestas al elegir un personaje */}

                {selectedCharacters.map((character, index) => {
                    return(
                    <CharacterResponse key = {`${character._id || character.name}-${index}`} 
                    selectedCharacter={character} secretCharacter={secretCharacter}/>
                    )
                })}

                {/* Boton para jugar de nuevo */}

                {isGameOver && <button className="button-play" onClick={startNewGame}>Play Again</button>}

                {/* Modal cuando se PIERDE el juego (5/5 intentos) */}

                <ResetModal isOpen={isModalOpen} onClose = {handleCloseModal}>
                    {isModalOpen === true && (
                        <div>
                            <h2>YOU LOST</h2>
                        </div>
                    )}
                </ResetModal>
                
            </div>
        </div>
    );
}

export default InputCharacter;
