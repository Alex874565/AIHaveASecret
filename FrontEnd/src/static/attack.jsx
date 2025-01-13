import './attack.css';
import Navbar from "../components/navbar.jsx";
import Chat from "../components/chat.jsx";
import SecretInput from "../components/secretinput.jsx";  // Import SecretInput component
import { useState } from "react";

const Attack = () => {
    const [selectedLevel, setSelectedLevel] = useState("Easy");

    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value);
    };

    return (
        <div id="attack-page">
            <Navbar />
            <div className="content-wrapper">
                {/* Tutorial Message */}
                <div className="tutorial-message">
                    <h2>Welcome to the Attack Mode Tutorial!</h2>
                    <p>This section is designed to help you learn how to play and improve your skills. Choose a
                        difficulty level to get started and interact with the AI to practice different scenarios.</p>
                    <p>Your goal is to make the AI reveal the secret password for each level. However, the AI will
                        upgrade the defenses based on the selected difficulty!</p>
                </div>

                {/* Level Selection Dropdown */}
                <div className="level-select-container">
                    <select value={selectedLevel} onChange={handleLevelChange} className="level-select">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                {/* Secret Input Component */}
                <SecretInput secret={selectedLevel === 'Easy' ? "SHAKIRA" : selectedLevel === 'Medium' ? 'GUACAMOLE' : 'DESPACITO'} />

                {/* Chat Component */}
                <Chat selectedLevel={selectedLevel} />
            </div>
        </div>
    );
};

export default Attack;
