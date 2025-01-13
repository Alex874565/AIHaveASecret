import { useEffect, useState } from "react";
import axios from "axios";
import './edit-ais.css';
import Navbar from "../components/navbar.jsx";

let EditAis = () => {
    const [ais, setAis] = useState([]);
    const [name, setName] = useState("");

    let getAis = async () => {
        if(!name || name === ""){
            return false;
        }
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/findall/${name}`, {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            console.log(res.data);
            await setAis(res.data);
            return res.data;
        }
    }

        useEffect(() => {
            setName(JSON.parse(localStorage.getItem('user')).name);
        }, []);

    useEffect(() => {
        getAis();
    }, [name]);

    return (
        <div id={"edit-ais-page"}>
            <Navbar />
            <h2>Edit Ais</h2>
            <div id={"edit-ais"}>
                {ais.map((ai, index) => (
                    <div key={ai.id || index} className={"ai-card"}>
                        <h3>{ai.name}</h3>
                        <p>Description: {ai.description}</p>
                        <p>Hints: {ai.hints}</p>
                        <p>Attacks: {ai.total_attacks}</p>
                        <p>Successful attacks: {ai.successful_attacks}</p>
                        <a id={"edit-button"} href={`/edit-ai/${ai.creator}/${ai.name}`}>Edit</a>
                        <a id={"attack-button"} href={`/attack-custom-ai/${ai.creator}/${ai.name}`}>Attack</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditAis;