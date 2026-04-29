function CharacterCard({ character, onSelect }) {
    return (
        <article className="character-card" onClick={() => onSelect(character)}>
            <h2 className="character-name">{character.name}</h2>
            <p className="character-meta">{character.series}</p>
        </article>
    );
}

export default CharacterCard;
