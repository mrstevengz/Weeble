function CharacterResponse({selectedCharacter, secretCharacter}) {
    if (!selectedCharacter || !secretCharacter) {
        return null;
    }

    return (
        <div className="character-response">
            <h2 className={`response-value ${secretCharacter.name === selectedCharacter.name ? "correct" : ""}`}>{selectedCharacter.name}</h2>

            <p className={`response-value ${secretCharacter.series === selectedCharacter.series ? "correct" : ""}`}>
            {selectedCharacter.series}
            </p>

            <p className={`response-value ${secretCharacter.gender === selectedCharacter.gender ? "correct" : ""}`}>
            {selectedCharacter.gender}
            </p>

            <p className={`response-value ${secretCharacter.hair_color === selectedCharacter.hair_color ? "correct" : ""}`}>
            {selectedCharacter.hair_color}
            </p>
        </div>
    );
}

export default CharacterResponse;
