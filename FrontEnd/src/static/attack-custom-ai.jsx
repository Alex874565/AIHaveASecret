import Chat from "../components/chat.jsx";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Navbar from "../components/navbar.jsx";
import './attack-custom-ai.css';

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
            <Navbar />
            <h2>Attack Custom AI</h2>
            
            <div id={"attack-custom-ai"}>
            
                
            <div id="ai-details">
                        <h3>{ai.name}</h3>
                        <p><strong>Creator:</strong> {ai.creator}</p>
                        <p><strong>Description:</strong> {ai.description}</p>
                        <p><strong>Hints:</strong> {ai.hints}</p>
                        <p><strong>Total Attacks:</strong> {ai.total_attacks}</p>
                        <p><strong>Successful Attacks:</strong> {ai.successful_attacks}</p>
                    </div>
                <Chat secret={ai.secret} prompt={ai.prompt}/>
            </div>
        </div>
    )
}

export default AttackCustomAi;