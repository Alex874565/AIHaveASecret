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

    const apiCall = async (history) => {
        setIsTyping(true);
        let processMessages = history.map((message) => {
            let role = "";
            if(message.sender==="AI"){
                role = "assistant";
            }
            else{
                role = "user";
            }
            return{role: role, content: message.message}
        })
        let aiResp = await axios.post(import.meta.env.VITE_LEGIT_OPENSOURCE_API,
            {
                model:"gpt-3.5-turbo",
                messages:[sysMess, ...processMessages]
            },{
                headers:{
                    "Authorization": "Bearer " + import.meta.env.VITE_LEGIT_OPENSOURCE_API_KEY
                }
            })
        console.log(aiResp);
        return aiResp;
    }

    const handleSubmit = async() => {
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
