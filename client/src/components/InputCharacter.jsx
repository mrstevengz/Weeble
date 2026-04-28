import { useState } from "react"

function InputCharacter() {
    const [text, setText] = useState('')
    return(
        <div className="main-card">
            <div className="input-container">
                <h2>Guess the character</h2>
                <input onChange={(e) => setText(e.target.value)} placeholder="Guess 1 of 5" />
                {text.trim() && (
                    <div className="input-dropdown">
                        <p>Dropdown content here....</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default InputCharacter