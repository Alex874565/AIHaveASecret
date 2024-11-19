import Navbar from "../components/navbar.jsx";

import './defense.css';

var Defense = () => {

    if (localStorage.getItem('user') != null) {
        return (
            <div id={"defense-page"}>
                <Navbar/>
                <div className={"content-wrapper"}>
                    <a id={"build-ai"} href={'build-ai'}>Build Your AI</a>
                    <p>OR</p>
                    <p id={"edit-ais-title"}>Edit your old AIs</p>
                    <div id={"edit-ais"}>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div id={"defense-page"}>
                <Navbar/>
                <div className={"content-wrapper"}>
                    <div className={"auth-redirect"}>
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
        )
    }
}

export default Defense;