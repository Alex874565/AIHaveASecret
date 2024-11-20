import {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.jsx";
import './attack-menu.css';

let AttackMenu = () => {

    const [ais, setAis] = useState([]);

    let getAis = async (name) => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall').catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            await setAis(res.data);
            console.log(res.data);
            return res.data;
        }
    }

    useEffect(() => {
        getAis();
    }, []);

    return (
        <div id={"attack-menu-page"}>
            <Navbar/>
            <h2>Attack Menu</h2>
            <div id={"attack-menu"}>
                {ais.map((ai, index) => (
                    <div key={ai.id || index} className={"ai-card"}>
                        <h3>{ai.name}</h3>
                        <h3>{ai.creator}</h3>
                        <p>{ai.description}</p>
                        <p>Attacks: {ai.total_attacks}</p>
                        <p>Successful attacks: {ai.successful_attacks}</p>
                        <a id={"attack-button"} href={`/attack-custom-ai/${ai.creator}/${ai.name}`}>Attack</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AttackMenu;