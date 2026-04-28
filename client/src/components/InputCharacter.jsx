import { useState } from "react";
import CharacterCard from "./CharacterCard";

function InputCharacter({ characters }) {
    const [text, setText] = useState("");
    const characterList = Array.isArray(characters) ? characters : [];

    const filteredCharacters = characterList.filter((character) =>
        character.name.toLowerCase().includes(text.trim().toLowerCase())
    );

    return (
        <div className="main-card">
            <div className="input-container">
                <h2>Guess the character</h2>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Guess 1 of 5"
                />
                {text.trim() && (
                    <div className="input-dropdown">
                        
                        {filteredCharacters.length > 0 ? (
                            filteredCharacters.map((character) => (
                                <CharacterCard
                                    key={character._id || character.name}
                                    character={character}
                                />
                            ))
                        ) : (
                            <p className="empty-state">No matching characters</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputCharacter;
