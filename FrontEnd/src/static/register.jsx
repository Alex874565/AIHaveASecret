import {useEffect, useState} from "react";
import axios from "axios";
import './register.css';
import Navbar from "../components/navbar.jsx";
import {showLoader, Loader, hideLoader} from "../components/loader.jsx";

var Register = () => {
    const [code, setCode] = useState("");

    useEffect(() => {
        document.getElementById('code-form').style.display = 'none';
        document.getElementById('auth-errors').style.display = 'none';
    }, []);

    var registerApiCall = async () => {
        let username = document.querySelector('input[name="username"]').value;
        let email = document.querySelector('input[name="email"]').value;
        let password = document.querySelector('input[name="password"]').value;
        showLoader();
        let response = await axios.post('http://127.0.0.1:8001/api/auth/register', {
            name: username,
            email: email,
            password: password
        }).catch((err) => {
            hideLoader();
            console.log(err);
            document.getElementById('auth-errors').style.display = 'block'; document.getElementById('auth-errors').innerText = 'Failed to register'; return false;
        });
        hideLoader();
        if(!response.data || !response.data.success){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Failed to register';
            return false;
        }
        alert('Registered succesfully');
        window.location.href = '/login';
    }

    var checkCode = (e) => {
        let tmpCode = document.querySelector('input[name="code"]').value;
        if(tmpCode === code){
            return registerApiCall();
        }else{
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Invalid code';
        }
    }

    var validateFields = async () => {
        document.getElementById('auth-errors').style.display = 'none';
        document.getElementById('code-form').style.display = 'none';
        var username = document.querySelector('input[name="username"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var password = document.querySelector('input[name="password"]').value;
        if(username === "" || email === "" || password === ""){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'All fields are required';
            return false;
        }
        if(!email.includes('@')){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Invalid email';
            return false;
        }
        if(password.length < 8){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Password must be at least 8 characters long';
            return false;
        }
        var response = await axios.post('http://127.0.0.1:8001/api/auth/check_user_existence', {
            email: email,
            name: username
        }).catch((err) => {
            console.log(err);
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Failed to check user existence';
            return false;
        });
        if(!response.data){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Failed to check user existence';
            return false;
        }
        if(response.data.nameExists === true){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Username taken.';
            return false;
        }
        if(response.data.emailExists === true){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Email taken.';
            return false;
        }

        let tmpCode = Math.floor(Math.random() * 1000000).toString();

        setCode(tmpCode);

        showLoader();

        response = await axios.post('http://127.0.0.1:8001/api/auth/send_mail', {
            email: email,
            code: tmpCode
        }).catch((err) => {
            hideLoader();
            console.log(err);
            document.getElementById('auth-errors').style.display = 'block'; document.getElementById('auth-errors').innerText = 'Failed to send email'; return false;
        });

        hideLoader();

        if(response.status === 200) {
            alert('Verification code sent to email');
        }

        if(!response.data || !response.data.success){
            document.getElementById('auth-errors').style.display = 'block';
            document.getElementById('auth-errors').innerText = 'Failed to send email';
            return false;
        }

        document.getElementById('code-form').style.display = 'block';
        document.getElementById('auth-errors').style.display = 'none';
    }

    return (
        <div id={"register-page"}>
            <Loader />
            <Navbar />
            <div className={"content-wrapper"}>
                <h2>Register</h2>
                <div id={"auth-form"}>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button onClick={validateFields}>Register</button>
                </div>
                <div id={"auth-errors"}></div>
                <div id={"code-form"}>
                    <input type="text" name="code" placeholder="Code"/>
                    <button onClick={checkCode}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;