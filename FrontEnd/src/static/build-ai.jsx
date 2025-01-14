import axios from 'axios';
import './build-ai.css';
import Navbar from "../components/navbar.jsx";

let BuildAi = () => {

    let checkAiExistence = async (name, creator) => {
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/find/${creator}/${name}`, {}, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }
        ).catch((err) => {
            return false;
        });
        if(res.status === 200){
            return true;
        }
    }

    let buildAiApiCall = async () => {

        let aiExists = await checkAiExistence(document.querySelector('input[name="name"]').value, JSON.parse(localStorage.getItem('user')).name);
        if(aiExists){
            document.getElementById('build-errors').innerHTML = 'You already have an AI with this name';
            return false;
        }
        let name = document.querySelector('input[name="name"]').value;
        let description = document.querySelector('input[name="description"]').value;
        let secret = document.querySelector('input[name="secret"]').value;
        let hints = document.querySelector('input[name="hints"]').value;
        let prompt = document.querySelector('input[name="prompt"]').value;
        if(!name || !description || !secret || !hints || !prompt){
            document.getElementById('build-errors').innerText = 'All fields are required';
            document.getElementById('build-errors').style.display = 'block';
            return false;
        }
        await axios.post('http://127.0.0.1:8001/api/ai/create', {
            creator: JSON.parse(localStorage.getItem('user')).name,
            name: name,
            description: description,
            system_prompt: prompt,
            secret: secret,
            hints: hints
        },{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).then((res) => {
            if(res.status === 201){
                alert('AI created');
                window.location.href = '/defense';
            }
        }).catch((err) => {
            document.getElementById('build-errors').innerText = err.response.data.message;
            document.getElementById('build-errors').style.display = 'block';
        });
    }

    if(localStorage.getItem('user')) {
        return (
            <div id={"build-ai-page"}>
                <Navbar />
                <h2>Build AI</h2>
                <div>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="description" placeholder="Description"/>
                    <input type="text" name="prompt" placeholder="Prompt"/>
                    <input type="text" name="secret" placeholder="Secret"/>
                    <input type="text" name="hints" placeholder="Hints"/>
                    <button id={"button"} onClick={buildAiApiCall}>Build AI</button>
                    <div id={"build-errors"}></div>
                </div>
                
            </div>
        )
    } else {
        return (
            <div id={"build-ai-page"}>
                <Navbar />
                <div className={"login-error"}>
                    <h2>You must be logged in to build an AI</h2>
                    <a href={"/login"}>Login</a>
                </div>
            </div>
        )
    }
}

export default BuildAi;
