import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar.jsx";
import './attack-menu.css';

let AttackMenu = () => {
    const [ais, setAis] = useState([]);
    const [sortedAis, setSortedAis] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCondition, setSortCondition] = useState('none'); // Example: none, most-attacks, highest-success
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    let getAis = async () => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall', {}, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            const fetchedAis = res.data.filter((ai) => ai.creator !== JSON.parse(localStorage.getItem('user')).name);
            setAis(fetchedAis);
            setSortedAis(fetchedAis);
        }
    };

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

    useEffect(() => {
        sortAis();
        setCurrentPage(1); // Reset to the first page when searchQuery or sortCondition changes
    }, [searchQuery, sortCondition]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            getAis();
        }
    }, []);

    // Get paginated data
    const paginatedData = sortedAis.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate total pages
    const totalPages = Math.ceil(sortedAis.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                        {paginatedData.map((ai, index) => (
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

                    {/* Pagination Controls */}
                    <div className="pagination-container">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                            >
                                {page}
                            </button>
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
