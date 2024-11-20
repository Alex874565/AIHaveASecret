import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from "../components/chat.jsx";
import './edit-ai.css';

let EditAi = () => {
    const [ai, setAi] = useState({});

    let {name, creator} = useParams();

    let getAi = async (name, creator) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/find/${creator}/${name}`).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            setAi(res.data);
            return res.data;
        }
    }

    useEffect(() => {
        getAi(name, creator);
    }, []);

    let handleInputChange = (index, key, value) => {
        let newAi = {...ai};
        newAi[key] = value;
        setAi(newAi);
    }

    let saveChanges = async (ai) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/update/${ai.creator}/${ai.name}`, ai).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            alert('AI updated');
            window.location.href = '/edit-ais';
        }
    }

    let deleteAi = async (ai) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/delete/${ai.creator}/${ai.name}`).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            alert('AI deleted');
            window.location.href = '/edit-ais';
        }
    }

    return (
        <div id={"edit-ai-page"}>
            <h2>Edit Ais</h2>
            <div id={"edit-ai"}>
                <div key={ai.id} className={"ai-card"}>
                    <h3>{ai.name}</h3>
                    <p>{ai.creator}</p>
                    <textarea
                        value={ai.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                    <textarea
                        value={ai.hints}
                        onChange={(e) => handleInputChange(index, 'hints', e.target.value)}
                    />
                    <p>{ai.prompt}</p>
                    <p>{ai.secret}</p>
                    <p>{ai.total_attacks}</p>
                    <p>{ai.successful_attacks}</p>
                    <button onClick={() => saveChanges(ai)}>Save</button>
                    <button onClick={() => deleteAi(ai)}>Delete</button>
                    <Chat secret={ai.secret} prompt={ai.prompt}/>
                </div>
            </div>
        </div>
    )
}

export default EditAi;