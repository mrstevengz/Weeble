function CharacterResponse({selectedCharacter}) {
    if (!selectedCharacter) {
        return null;
    }

    return (
        <div className="character-response">
            <h2>{selectedCharacter.name}</h2>
            <p>{selectedCharacter.series}</p>
            <p>{selectedCharacter.gender}</p>
            <p>{selectedCharacter.hair_color}</p>
        </div>
    );
}

export default CharacterResponse;
