import Chat from "../components/chat.jsx";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

let AttackCustomAi = () => {
    const [ai, setAi] = useState({});
    // get name, creator with useParams
    let {name, creator} = useParams();

    let getAi = async (name, creator) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/find/${creator}/${name}`).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            await setAi(res.data);
            return res.data;
        }
    }

    useEffect(() => {getAi(name, creator)}, []);

    return (
        <div id={"attack-custom-ai-page"}>
            <h2>Attack Custom AI</h2>
            <div id={"attack-custom-ai"}>
                <h3>{ai.name}</h3>
                <h3>{ai.creator}</h3>
                <p>{ai.description}</p>
                <p>{ai.hints}</p>
                <p>Attacks: {ai.total_attacks}</p>
                <p>Successful Attacks: {ai.successful_attacks}</p>
                <button>Attack</button>
                <Chat secret={ai.secret} prompt={ai.prompt}/>
            </div>
        </div>
    )
}

export default AttackCustomAi;