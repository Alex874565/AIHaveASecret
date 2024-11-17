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
                        <div className={"auth-buttons"}>
                            <a href={'/login'}>Login</a>
                            <a href={'/register'}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Defense;