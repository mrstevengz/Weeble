import { useGameState } from "../hooks/useGameState";
import CharacterCard from "./CharacterCard";
import CharacterResponse from "./CharacterResponse";
import ResetModal from "./ResetModal";

function InputCharacter({ characters }) {

    const characterList = Array.isArray(characters) ? characters : [];

    const {
        text, setText,
        selectedCharacters,
        isModalOpen,
        hasWon, hasLost, isGameOver,
        secretCharacter,
        currentGuessNumber,
        MAX_GUESSES,
        handleSelectCharacter,
        startNewGame,
        handleCloseModal,
    } = useGameState(characterList);

    //Variable para almacener los valores de los personajes en un array y quitarles espacios/mayusculas
    const filteredCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(text.trim().toLowerCase())
    );


    return (
        <div className="main-card">
            <div className="input-container">
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
                        <p>Gender</p>
                        <p>Age</p>
                        <p>Series</p>
                        <p>Genre</p>
                        <p>Released in</p>
                        <p>Role</p>
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

                {/* Modal cuando se PIERDE el juego (6/6 intentos) */}

                <ResetModal isOpen={isModalOpen} onClose = {handleCloseModal}>
                    {secretCharacter && (
                        hasLost ? (
                        <>
                            <h2 className="modal-result">YOU LOST</h2>
                            <p className="modal-text">Your Character Was:</p>
                            <p className="modal-char">{secretCharacter.name}</p>
                            <p className="modal-series">From: {secretCharacter.series}</p>
                        </>
                    ): (
                        <>
                            <h2 className="modal-result" >YOU WON</h2>
                            <p className="modal-text">Your Character Was:</p>
                            <p className="modal-char">{secretCharacter.name}</p>
                            <p className="modal-series">From: {secretCharacter.series}</p>
                        </>
                    )
                    )}
                </ResetModal>
                
            </div>
        </div>
    );
}

export default InputCharacter;
