// SecretInput.js
import './secretinput.css';  // Import the CSS file
import { useState, useEffect } from "react";
import axios from "axios";

const SecretInput = ({ secret, attacker, ai, isTestOnly = false }) => {
    const [userSecret, setUserSecret] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    // Handle input change
    const handleChange = (event) => {
        setUserSecret(event.target.value);
    };

    // Handle secret submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        let res;
        if (userSecret.trim().toUpperCase() === secret.toUpperCase()) {
            setIsCorrect(true);
            let user = JSON.parse(localStorage.getItem('user'));
            if(ai.creator !== user.name) {
                user.trophies += 10;
                user.attack_trophies += 10;
                user.attacks += 1;
                localStorage.setItem('user', JSON.stringify(user));
                await axios.post(`http://127.0.0.1:8001/api/user/update/${attacker}`, {
                    trophies: user.trophies,
                    attack_trophies: user.attack_trophies,
                    attacks: user.attacks
                }, {
                    headers : {
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                });
                ai.successful_attacks += 1;
                ai.total_attacks += 1;
                await axios.post(`http://127.0.0.1:8001/api/ai/update/${ai.creator}/${ai.name}`, {
                    successful_attacks: ai.successful_attacks,
                    total_attacks: ai.total_attacks
                }, {
                    headers : {
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }
        } else {
            setIsCorrect(false);
            let user = JSON.parse(localStorage.getItem('user'));

            console.log(ai.creator, user.name)
            if(ai.creator !== user.name) {
                user.attacks += 1;
                localStorage.setItem('user', JSON.stringify(user));
                await axios.post(`http://127.0.0.1:8001/api/user/update/${attacker}`, {
                    attacks: user.attacks
                }, {
                    headers : {
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                });
                res = await axios.post(`http://127.0.0.1:8001/api/user/find/${ai.creator}`, {},
                    {
                        headers : {
                            "Authorization": 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                await axios.post(`http://127.0.0.1:8001/api/user/update/${ai.creator}`, {
                    trophies: res.data.trophies + 10,
                    defense_trophies: res.data.defense_trophies + 10
                }, {
                    headers : {
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                });
                ai.total_attacks += 1;
                await axios.post(`http://127.0.0.1:8001/api/ai/update/${ai.creator}/${ai.name}`, {
                    total_attacks: ai.total_attacks
                }, {
                    headers : {
                        "Authorization": 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }
        }
    };

    useEffect(() => {
        setIsCorrect(null);
        setUserSecret("");
        document.getElementsByClassName('secret-input')[0].value = '';
    }, [secret]);

    return (
        <div className="secret-input-container">
            <h3>Enter the secret password:</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userSecret}
                    onChange={handleChange}
                    placeholder="Enter secret"
                    className="secret-input"
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>

            {isCorrect !== null && (
                <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
                    {isCorrect ? attacker ? "Correct! You've cracked the code! +10 trophies" : "Correct! You've cracked the code!" : "Incorrect. Try again!"}
                </div>
            )}
        </div>
    );
};

export default SecretInput;
