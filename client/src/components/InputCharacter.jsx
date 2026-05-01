import { useState } from "react";
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
    const isGameOver = selectedCharacters.length >= MAX_GUESSES;

    //Variable para almacener los valores de los personajes en un array y quitarles espacios/mayusculas
    const filteredCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(text.trim().toLowerCase())
    );

  function handleSelectCharacter(character) {
    if (isGameOver) return;

    const nextCharacters = [...selectedCharacters, character];
    

    setSelectedCharacters(nextCharacters);
    setText("");

    if (nextCharacters.length === MAX_GUESSES) {
        setIsModalOpen(true);
    }
}


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

                {selectedCharacters.length > 0 && (
                    <div className="response-categories">
                        <h3>Name</h3>
                        <p>Series</p>
                        <p>Hair Color</p>
                        <p>Age</p>
                    </div>
                )}

                {selectedCharacters.map((character, index) => {
                    return(
                    <CharacterResponse key = {`${character._id || character.name}-${index}`} 
                    selectedCharacter={character} />
                    )
                })}

                <ResetModal isOpen={isModalOpen} onClose = {handleCloseModal}>
                    {isModalOpen == true && (
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
