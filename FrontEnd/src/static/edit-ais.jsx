import { useEffect, useState } from "react";
import axios from "axios";
import './edit-ais.css';
import Navbar from "../components/navbar.jsx";

let EditAis = () => {
    const [ais, setAis] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of AIs to display per page

    let getAis = async () => {
        if (!name || name === "") {
            return false;
        }
        let res = await axios.post(`http://127.0.0.1:8001/api/ai/findall/${name}`, {}, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }).catch((err) => {
            console.log(err);
        });
        if (res.status === 200) {
            setAis(res.data);
        }
    };

    useEffect(() => {
        setName(JSON.parse(localStorage.getItem('user')).name);
    }, []);

    useEffect(() => {
        getAis();
    }, [name]);

    // Pagination logic
    const totalPages = Math.ceil(ais.length / itemsPerPage);
    const paginatedAis = ais.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div id={"edit-ais-page"}>
            <Navbar />
            <h2>Edit AIs</h2>
            <div id={"edit-ais"}>
                {paginatedAis.map((ai, index) => (
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
    );
};

export default EditAis;
