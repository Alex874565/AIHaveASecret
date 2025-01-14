import { useEffect, useState } from "react";
import axios from "axios";
import './leaderboard.css';
import Navbar from "../components/navbar.jsx";

let Leaderboard = () => {
    let [users, setUsers] = useState([]);
    let [ais, setAis] = useState([]);
    let [sortField, setSortField] = useState(null);
    let [sortOrder, setSortOrder] = useState('asc');
    let [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    let getAis = async () => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall', {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            await setAis(res.data);
            return res.data;
        }
    }

    let getUsers = async () => {
        let res = await axios.post('http://127.0.0.1:8001/api/user/findall', {},{
            headers : {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }}).catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            for(let user of res.data){
                user.ais = ais.filter(ai => ai.creator === user.name);
            }
            res.data.sort((a, b) => b.trophies - a.trophies);
            setSortField('trophies');
            setSortOrder('desc');
            await setUsers(res.data);
            return res.data;
        }
    }

    useEffect(() => {getAis()}, []);

    useEffect(() => {getUsers()}, [ais]);

    const handleSort = (field) => {
        const order = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        const sortedUsers = [...users].sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setUsers(sortedUsers);
    }

    const renderSortArrow = (field) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const totalPages = Math.ceil(users.length / usersPerPage);
    const displayedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    return (
        <div id="leaderboard-page">
            <Navbar />
            <div className="content-wrapper">
                <div id={"leaderboard"}>
                    <h2>Leaderboard</h2>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th onClick={() => handleSort('name')}>Name{renderSortArrow('name')}</th>
                            <th onClick={() => handleSort('ais')}>AIs{renderSortArrow('ais')}</th>
                            <th onClick={() => handleSort('trophies')}>Trophies{renderSortArrow('trophies')}</th>
                            <th onClick={() => handleSort('attack_trophies')}>Attack Trophies{renderSortArrow('attack_trophies')}</th>
                            <th onClick={() => handleSort('defense_trophies')}>Defense Trophies{renderSortArrow('defense_trophies')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayedUsers.map((user, index) => (
                            <tr key={user.id || index}>
                                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.ais.length}</td>
                                <td>{user.trophies}</td>
                                <td>{user.attack_trophies}</td>
                                <td>{user.defense_trophies}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;