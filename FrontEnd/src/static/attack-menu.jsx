import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.jsx";
import './attack-menu.css';

let AttackMenu = () => {
    const [ais, setAis] = useState([]);
    const [sortedAis, setSortedAis] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCondition, setSortCondition] = useState('none'); // Example: none, most-attacks, highest-success

    let getAis = async (name) => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall', {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            const fetchedAis = res.data.filter((ai) => ai.creator !== JSON.parse(localStorage.getItem('user')).name);
            setAis(fetchedAis);
            setSortedAis(fetchedAis);
        }
    };

    // Sort AIs based on the selected condition
    const sortAis = () => {
        let sorted = [...ais];

        // Apply search query
        if (searchQuery.trim() !== '') {
            sorted = sorted.filter(
                (ai) =>
                    ai.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ai.creator.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sort condition
        if (sortCondition === 'most-attacks') {
            sorted.sort((a, b) => b.total_attacks - a.total_attacks); // Descending order of total attacks
        } else if (sortCondition === 'highest-success') {
            sorted.sort((a, b) => b.successful_attacks - a.successful_attacks); // Descending order of successful attacks
        }

        setSortedAis(sorted);
    };

    // Watch for changes in searchQuery or sortCondition
    useEffect(() => {
        sortAis();
    }, [searchQuery, sortCondition]);

    // Fetch data on component mount
    useEffect(() => {
        if(localStorage.getItem('user')) {
            getAis();
        }
    }, []);

    if (localStorage.getItem('user')) {
        return (
            <div id="attack-menu-page">
                <Navbar />

                <div className={"content-wrapper"}>
                    <h2>Attack Menu</h2>

                    {/* Search and Sort Controls */}
                    <div className="search-sort-container">
                        <input
                            type="text"
                            placeholder="Search by name or creator"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <select
                            value={sortCondition}
                            onChange={(e) => setSortCondition(e.target.value)}
                            className="sort-select"
                        >
                            <option value="none">Oldest to newest</option>
                            <option value="most-attacks">Most Attacks</option>
                            <option value="highest-success">Highest Success</option>
                        </select>
                    </div>

                    {/* Attack Menu */}
                    <div id="attack-menu">
                        {sortedAis.map((ai, index) => (
                            <div key={ai.id || index} className="ai-card">
                                <h3>{ai.name}</h3>
                                <h3>{ai.creator}</h3>
                                <p>Description: {ai.description}</p>
                                <p>Attacks: {ai.total_attacks}</p>
                                <p>Successful attacks: {ai.successful_attacks}</p>
                                <a id="attack-button" href={`/attack-custom-ai/${ai.creator}/${ai.name}`}>
                                    Attack
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="attack-menu-page">
                <Navbar />
                <div className="content-wrapper">
                    <div className="auth-redirect">
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
        );
    }
};

export default AttackMenu;
