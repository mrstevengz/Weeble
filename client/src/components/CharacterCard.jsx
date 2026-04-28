function CharacterCard({character}) {
    return (
        <article className="character-card">
            <h2>{character.name}</h2>
            <p>{character.gender}</p>
            <p>{character.series}</p>
            <p>{character.age}</p>
            <p>{character.hair_color}</p>
        </article>

    )
}

export default CharacterCard