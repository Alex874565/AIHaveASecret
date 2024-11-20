// SecretInput.js
import './secretinput.css';  // Import the CSS file
import { useState, useEffect } from "react";

const SecretInput = ({ secret }) => {
    const [userSecret, setUserSecret] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    // Handle input change
    const handleChange = (event) => {
        setUserSecret(event.target.value);
    };

    // Handle secret submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (userSecret.trim().toUpperCase() === secret.toUpperCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    useEffect(() => {
        setIsCorrect(null);
        setUserSecret(null);
        document.getElementsByClassName('secret-input')[0].value = null;
    }, [secret]);

    return (
        <div className="secret-input-container">
            <h3>Enter the secret password:</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userSecret}
                    onChange={handleChange}
                    placeholder="Enter secret"
                    className="secret-input"
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            {isCorrect !== null && (
                <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? "Correct! You've cracked the code!" : "Incorrect. Try again!"}
                </div>
            )}
        </div>
    );
};

export default SecretInput;
