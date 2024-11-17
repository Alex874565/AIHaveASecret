import './attack.css';
import Navbar from "../components/navbar.jsx";
import Chat from "../components/chat.jsx";
import { useState } from "react";

const Attack = () => {
    const [selectedLevel, setSelectedLevel] = useState("easy");

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
                    <p>This section is designed to help you learn how to play and improve your skills. Choose a difficulty level to get started and interact with the AI to practice different scenarios.</p>
                </div>

                {/* Level Selection Dropdown */}
                <div className="level-select-container">
                    <select value={selectedLevel} onChange={handleLevelChange} className="level-select">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* Chat Component */}
                <Chat selectedLevel={selectedLevel} />
                
            </div>
        </div>
    );
};

export default Attack;
