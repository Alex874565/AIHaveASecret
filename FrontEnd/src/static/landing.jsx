import {useEffect} from "react";
import $ from 'jquery';

import Navbar from '../components/navbar.jsx'
import './landing.css';

var landing = () => {

    useEffect(() => {for(let child in $('#navbar').children) {child.classList.remove('active')}}, [])

    return (
        <div id={"landing-page"}>
            <Navbar />
            <div className="content-wrapper">
                <h1>AI Have A Secret</h1>
                <h4>THE AI Security Game</h4>
                <h4>Prompt Injection Attack/Defense</h4>
            </div>
        </div>);
}

export default landing;