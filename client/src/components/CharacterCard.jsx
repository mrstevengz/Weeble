function CharacterCard({ character }) {
    return (
        <article className="character-card">
            <h2 className="character-name">{character.name}</h2>
            <p className="character-meta">{character.series}</p>
        </article>
    );
}

export default CharacterCard;
