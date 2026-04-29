import { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterResponse from "./CharacterResponse";

function InputCharacter({ characters }) {
    const [text, setText] = useState("");
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const characterList = Array.isArray(characters) ? characters : [];

    const filteredCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(text.trim().toLowerCase())
    );

    function handleSelectCharacter(character) {
        setSelectedCharacters((previousCharacters) => [
            ...previousCharacters,
            character
        ]);
        setText("");
    }
    

    return (
        <div className="main-card">
            <div className="input-container">
                <h2>Guess the character</h2>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Guess ${selectedCharacters.length + 1} of 5`}
                />
                {text.trim() && (
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
                
            </div>
        </div>
    );
}

export default InputCharacter;
