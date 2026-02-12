import { useState } from "react";

const PledgeModal = ({ isOpen, onClose, onSubmit, error }) => {
    const [pledgeType, setPledgeType] = useState("time");
    const [hours, setHours] = useState("");
    const [action, setAction] = useState("");
    const [comment, setComment] = useState("");
    const [localError, setLocalError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError("");

        if (pledgeType === "time") {
            if (!hours || hours <= 0 || hours > 4) {
                setLocalError("Please enter hours between 1 and 4");
                return;
            }
        } else {
            if (!action.trim()) {
                setLocalError("Please describe your action");
                return;
            }
        }

        onSubmit({
            pledgeType,
            hours,
            action,
            comment,
        });

        // Reset form after submission
        setPledgeType("time");
        setHours("");
        setAction("");
        setComment("");
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content pledge-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Make a Pledge</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="pledge-form">
                    {(localError || error) && (
                        <div className="error-message">
                            {localError || error}
                        </div>
                    )}

                    <div className="pledge-type-selector">
                        <button
                            type="button"
                            className={pledgeType === "time" ? "active" : ""}
                            onClick={() => setPledgeType("time")}
                        >
                            ⏰ Time
                        </button>

                        <button
                            type="button"
                            className={pledgeType === "words" ? "active" : ""}
                            onClick={() => setPledgeType("words")}
                        >
                            💬 Words
                        </button>
                    </div>

                    {pledgeType === "time" ? (
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="Hours (1–4)"
                        />
                    ) : (
                        <input
                            type="text"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            placeholder="Describe your action"
                        />
                    )}

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Optional message"
                        rows="3"
                    />

                    <div className="form-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PledgeModal;
