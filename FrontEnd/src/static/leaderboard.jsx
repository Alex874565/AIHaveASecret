import { useEffect, useState } from "react";
import axios from "axios";
import './leaderboard.css';

let Leaderboard = () => {
    let [users, setUsers] = useState([]);
    let [ais, setAis] = useState([]);

    let getAis = async (name) => {
        let res = await axios.post('http://127.0.0.1:8001/api/ai/findall').catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            await setAis(res.data);
            console.log(res.data);
            return res.data;
        }
    }

    let getUsers = async () => {
        let res = await axios.post('http://127.0.0.1:8001/api/user/findall').catch((err) => {
            console.log(err);
        });
        if(res.status === 200) {
            console.log(res.data);
            for(let user of res.data){
                console.log(user);
                console.log(ais);
                user.ais = ais.filter(ai => ai.creator === user.name);
            }
            await setUsers(res.data);
            return res.data;
        }
    }

    useEffect(() => {getAis()}, []);

    useEffect(() => {getUsers()}, [ais]);

    return (
        <div id={"leaderboard-page"}>
            <h2>Leaderboard</h2>
            <table style={{color: 'black'}}>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>AIs</th>
                    <th>Trophies</th>
                    <th>Attack Trophies</th>
                    <th>Defense Trophies</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id || index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.ais.length}</td>
                        <td>{user.trophies}</td>
                        <td>{user.attack_trophies}</td>
                        <td>{user.defense_trophies}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;