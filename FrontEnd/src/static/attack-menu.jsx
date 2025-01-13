import {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.jsx";
import './attack-menu.css';

let AttackMenu = () => {

    const [ais, setAis] = useState([]);

    let getAis = async (name) => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall', {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            await setAis(res.data.filter((ai) => {return ai.creator !== JSON.parse(localStorage.getItem('user')).name}));
            console.log(res.data);
            return res.data.filter((ai) => {return ai.creator !== JSON.parse(localStorage.getItem('user')).name})
        }
    }

    useEffect(() => {
        getAis();
    }, []);

    if(localStorage.getItem('user')) {
        return (
            <div id={"attack-menu-page"}>
                <Navbar/>
                <h2>Attack Menu</h2>
                <div id={"attack-menu"}>
                    {ais.map((ai, index) => (
                        <div key={ai.id || index} className={"ai-card"}>
                            <h3>{ai.name}</h3>
                            <h3>{ai.creator}</h3>
                            <p>Description: {ai.description}</p>
                            <p>Attacks: {ai.total_attacks}</p>
                            <p>Successful attacks: {ai.successful_attacks}</p>
                            <a id={"attack-button"} href={`/attack-custom-ai/${ai.creator}/${ai.name}`}>Attack</a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }else{
        return (
            <div id={"attack-menu-page"}>
                <Navbar/>
                <div className={"content-wrapper"}>
                    <div className={"auth-redirect"}>
                        <p>Please login or register to access this page.</p>
                        <div className="button-container">
                            <a href="/login">
                                <button className="button button_login">Login</button>
                            </a>
                            <a href="/register">
                                <button className="button button_register">Register</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AttackMenu;