import './chat.css';
import { useState } from "react";

const Chat = ({ selectedLevel }) => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { sender: "AI", message: "Welcome! Please enter your command." }
    ]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };



    const handleSubmit = () => {
        if (userInput.trim() === "") return;

        // Add user message to chat history
        setChatHistory([...chatHistory, { sender: "You", message: userInput }]);

        // Simulate AI response (you can replace this with an API call)
        const aiResponse = `You selected ${selectedLevel} level. AI is processing your input...`;
        setChatHistory((prevHistory) => [
            ...prevHistory,
            
            { sender: "AI", message: aiResponse }
        ]);

        // Clear the input field
        setUserInput("");
        document.getElementsByClassName('chat-history')[0].scrollTop = document.getElementsByClassName('chat-history')[0][0].scrollHeight;
    };



    // Handle Enter key press
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className='chat-container-wrapper'>
            <div className="chat-container">
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`chat-message ${chat.sender === "User" ? "user-message" : "ai-message"}`}
                        >
                            <strong>{chat.sender}:</strong> {chat.message}
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message here and press Enter or the button to send..."
                    />
                    <button onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
