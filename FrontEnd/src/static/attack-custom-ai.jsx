import Chat from "../components/chat.jsx";

let AttackCustomAi = (ai) => {
    return (
        <div id={"attack-custom-ai-page"}>
            <h2>Attack Custom AI</h2>
            <div id={"attack-custom-ai"}>
                <h3>{ai.name}</h3>
                <h3>{ai.creator}</h3>
                <p>{ai.description}</p>
                <p>{ai.hints}</p>
                <button>Attack</button>
                <Chat secret={ai.secret}/>
            </div>
        </div>
    )
}

export default AttackCustomAi;