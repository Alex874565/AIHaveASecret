import {useEffect, useState} from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import Navbar from "../components/navbar.jsx"; // Import the Navbar
import './profile.css';

let Profile = () => {

  let openChangePassword = () => {
    document.getElementById("change-password").style.display = "block";
    document.getElementById("open-change-password").style.display = "none";
    document.getElementById("close-change-password").style.display = "block";
    const container = document.getElementById("profile-content");
    if (container) {
        container.scrollTop = container.scrollHeight; // Forces recalculation.
    }
  };

  let closeChangePassword = () => {
    document.getElementById("change-password").style.display = "none";
    document.getElementById("open-change-password").style.display = "block";
    document.getElementById("close-change-password").style.display = "none";
  };

  let changePasswordApiCall = async () => {
    let confirmPassword = document.querySelector('input[name="confirm-password"]').value;
    let oldPassword = document.querySelector('input[name="old-password"]').value;
    let newPassword = document.querySelector('input[name="new-password"]').value;

    if (newPassword !== confirmPassword) {
      document.getElementById("password-errors").innerText = "Passwords do not match";
      return false;
    }
    if (!confirmPassword || !oldPassword || !newPassword) {
      document.getElementById("password-errors").innerText = "All fields are required";
      return false;
    }
    if (newPassword.length < 8) {
      document.getElementById("password-errors").innerText = "Password must be at least 8 characters long";
      return false;
    }

    let res = await bcrypt.compare(oldPassword, JSON.parse(localStorage.getItem("user")).password);
    if (!res) {
      document.getElementById("password-errors").innerText = "Old password is incorrect";
      return false;
    }

    let res2 = await axios
      .post(`http://127.0.0.1:8001/api/user/update/${JSON.parse(localStorage.getItem("user")).name}`, {
        password: newPassword,
      },{
          headers : {
              "Authorization": 'Bearer ' + localStorage.getItem('token')
          }})
      .catch((err) => {
        document.getElementById("password-errors").innerText = err.response.data.message;
      });
    if (res2.status === 200) {
      alert("Password changed");
      closeChangePassword();
      window.location.href = "/profile";
    }
  };

  if (!localStorage.getItem("user")) {
    return (
      <div id={"profile-page"}>
          <Navbar />
          <div className={"content-wrapper"}>
            <div id="not-logged-in">
                <h2>Profile</h2>
                <h3>You are not logged in</h3>
                    <a href={"/login"}>Login</a>
            </div>
          </div>
      </div>
    );
  } else {
    return (
        <div id="profile-page">
            {/* Navbar Component placed outside of the content */}
            <Navbar />
        
            <div className={"content-wrapper"}>
                <div id="profile-content">
                    <h2>Profile</h2>
                    <h3>Username: {JSON.parse(localStorage.getItem("user")).name}</h3>
                    <h3>Email: {JSON.parse(localStorage.getItem("user")).email}</h3>
                    <h3>Attacks: {JSON.parse(localStorage.getItem("user")).attacks}</h3>
                    <h3>Trophies: {JSON.parse(localStorage.getItem("user")).trophies}</h3>
                    <h3>Attack Trophies: {JSON.parse(localStorage.getItem("user")).attack_trophies}</h3>
                    <h3>Defense Trophies: {JSON.parse(localStorage.getItem("user")).defense_trophies}</h3>

                    {/* Change Password Section */}
                    <div id="change-password" style={{ display: "none" }}>
                    <input type="password" name="old-password" placeholder="Old Password" />
                    <input type="password" name="new-password" placeholder="New Password" />
                    <input type="password" name="confirm-password" placeholder="Confirm Password" />
                    <div id="password-errors"></div>
                    <button className="change-password-btn" onClick={changePasswordApiCall}>
                        Change Password
                    </button>
                    </div>

                    {/* Buttons for changing password or logging out */}
                    <button id="open-change-password" onClick={openChangePassword}>
                    Change Password
                    </button>
                    <button id="close-change-password" style={{display: "none"}} onClick={closeChangePassword}>
                    Cancel
                    </button>
                    <button
                    onClick={() => {
                        if(confirm("Are you sure you want to log out?")) {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }
                    }}
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
    );
  }
};

export default Profile;
