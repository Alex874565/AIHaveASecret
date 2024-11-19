// SecretInput.js
import './secretinput.css';  // Import the CSS file
import { useState, useEffect } from "react";

const SecretInput = ({ selectedLevel }) => {
    const [userSecret, setUserSecret] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctSecret, setCorrectSecret] = useState("");

    // Set the correct secret based on the selected level
    useEffect(() => {
        let secret;
        switch (selectedLevel.toLowerCase()) {
            case "easy":
                secret = "SHAKIRA";
                break;
            case "medium":
                secret = "PASSWORD123";
                break;
            case "hard":
                secret = "SECRETDEFENSE";
                break;
            default:
                secret = "SHAKIRA";
        }
        setCorrectSecret(secret);
    }, [selectedLevel]);

    // Handle input change
    const handleChange = (event) => {
        setUserSecret(event.target.value);
    };

    // Handle secret submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (userSecret.trim().toUpperCase() === correctSecret.toUpperCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

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
