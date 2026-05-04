import { CircleAlert } from "lucide-react";
import { useState } from "react";
import ResetModal from "./ResetModal";


export default function NavBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function openModal() {
        setIsModalOpen(true);
    }

    return (
    <>
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="navbar-text">Weeble</h1>
                <button className="navbar-help-button" onClick={openModal} aria-label="How to play">
                    <CircleAlert className="navbar-circle" />
                </button>
            </div>
        </nav>

        <ResetModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="how-to-play">
               <p className="how-to-eyebrow">Quick guide</p>
               <h2 className="how-to-title">How to Play</h2>
               <p className="how-to-intro">
                    Find the secret animanga character before your 5 guesses run out.
               </p>

               <div className="how-to-steps">
                    <div className="how-to-step">
                        <span>1</span>
                        <p>Type a character name and choose one from the dropdown.</p>
                    </div>
                    <div className="how-to-step">
                        <span>2</span>
                        <p>Each guess compares name, series, gender, and hair color.</p>
                    </div>
                    <div className="how-to-step">
                        <span>3</span>
                        <p>Green matches are correct clues. Use them to narrow the answer.</p>
                    </div>
               </div>

               <p className="how-to-note">You get 5 total guesses. Choose carefully.</p>
            </div>
        </ResetModal>
    </>

    );
}
