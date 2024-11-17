import axios from 'axios';

var Login = () => {

    var loginApiCall = async () => {
        if(!document.querySelector('input[name="email"]').value || !document.querySelector('input[name="password"]').value){
            alert('All fields are required');
            return false;
        }
        if(!document.querySelector('input[name="email"]').value.includes('@')){
            alert('Invalid email');
            return false;
        }
        if(document.querySelector('input[name="password"]').value.length < 8){
            alert('Password must be at least 8 characters long');
            return false;
        }
        let email = document.querySelector('input[name="email"]').value;
        let password = document.querySelector('input[name="password"]').value;
        let res = await axios.post('http://127.0.0.1:8001/api/auth/login', {
            email: email,
            password: password
        }).catch((err) => {
            alert('Invalid username or password');
        })
        if(res.status === 200 && res.data.user){
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = '/';
        }
    }

    return (
        <div id={"login-page"}>
            <h2>Login</h2>
            <div>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button onClick={loginApiCall} value={"Login"}>Login</button>
            </div>
            <div id={"auth-errors"}></div>
        </div>
    )
}

export default Login;