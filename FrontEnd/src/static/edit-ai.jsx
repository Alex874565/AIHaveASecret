import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "../components/navbar.jsx";
import './edit-ai.css';


let EditAi = () => {
    const [ai, setAi] = useState({});

    let { name, creator } = useParams();

    let getAi = async (name, creator) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/find/${creator}/${name}`, {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            setAi(res.data);
            return res.data;
        }
    }

    useEffect(() => {
        getAi(name, creator);
    }, [name, creator]);

    let handleInputChange = (key, value) => {
        let newAi = { ...ai };
        newAi[key] = value;
        setAi(newAi);
    }

    let saveChanges = async (ai) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/update/${ai.creator}/${ai.name}`, ai).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            alert('AI updated');
            window.location.href = '/edit-ais';
        }
    }

    let deleteAi = async (ai) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/delete/${ai.creator}/${ai.name}`).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            alert('AI deleted');
            window.location.href = '/edit-ais';
        }
    }

    return (
        <div id={"edit-ai-page"}>
            <Navbar />
            <h2>Edit AI</h2>
            <div id={"edit-ai"}>
                <div className={"ai-card"}>
                    <h3>{ai.name}</h3>
                    <p><strong>Creator:</strong> {ai.creator}</p>

                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={ai.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Edit the description of the AI..."
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="hints">Hints:</label>
                        <textarea
                            id="hints"
                            value={ai.hints}
                            onChange={(e) => handleInputChange('hints', e.target.value)}
                            placeholder="Edit the hints of the AI..."
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="prompt">Prompt:</label>
                        <textarea
                            id="prompt"
                            value={ai.prompt}
                            onChange={(e) => handleInputChange('prompt', e.target.value)}
                            placeholder="Edit the prompt of the AI..."
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="secret">Secret:</label>
                        <textarea
                            id="secret"
                            value={ai.secret}
                            onChange={(e) => handleInputChange('secret', e.target.value)}
                            placeholder="Edit the secret of the AI..."
                        />
                    </div>

                    <div className="input-group">
                        <p><strong>Total Attacks:</strong> {ai.total_attacks}</p>
                        <p><strong>Successful Attacks:</strong> {ai.successful_attacks}</p>
                    </div>

                    <div className="button-group">
                        <button className="save-btn" onClick={() => saveChanges(ai)}>Save Changes</button>
                        <button className="delete-btn" onClick={() => deleteAi(ai)}>Delete AI</button>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default EditAi;
