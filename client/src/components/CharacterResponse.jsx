import { getDirection, age_group_order, getDecadeDirection } from "../hooks/enumComparisons";

function CharacterResponse({selectedCharacter, secretCharacter}) {
    if (!selectedCharacter || !secretCharacter) {
        return null;
    }

    const ageDirection = getDirection(age_group_order, selectedCharacter.age_group, secretCharacter.age_group)

    const decadeDirection = getDecadeDirection(selectedCharacter.series_decade, secretCharacter.series_decade)

    return (
        <div className="character-response">
            <h2 className={`response-value ${secretCharacter.name === selectedCharacter.name ? "correct" : ""}`}>{selectedCharacter.name}</h2>

            <p className={`response-value ${secretCharacter.gender === selectedCharacter.gender ? "correct" : ""}`}>
            {selectedCharacter.gender} 
            </p>

            <p className={`response-value ${secretCharacter.age_group === selectedCharacter.age_group ? "correct" : ""}`}>
            <span>{selectedCharacter.age_group}</span> <span>{ageDirection === "up" ? "↑" : ageDirection === "down" ? "↓" : null}</span>
            </p>

            <p className={`response-value ${secretCharacter.series === selectedCharacter.series ? "correct" : ""}`}>
            {selectedCharacter.series}
            </p>
            <p className={`response-value ${secretCharacter.series_demographic === selectedCharacter.series_demographic ? "correct" : ""}`}>
            {selectedCharacter.series_demographic}
            </p>
            <p className={`response-value ${secretCharacter.series_decade === selectedCharacter.series_decade ? "correct" : ""}`}>
             <span>{selectedCharacter.series_decade}</span> <span>{decadeDirection === "up" ? "↑" : decadeDirection === "down" ? "↓" : null}</span>
            </p>
            <p className={`response-value ${secretCharacter.role === selectedCharacter.role ? "correct" : ""}`}>
            {selectedCharacter.role}
            </p>
            <p className={`response-value ${secretCharacter.hair_color === selectedCharacter.hair_color ? "correct" : ""}`}>
            {selectedCharacter.hair_color}
            </p>
        </div>
    );
}

export default CharacterResponse;
