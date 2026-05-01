export default function ResetModal({isOpen, onClose, children}) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}