import React, { useState } from 'react'
import '../../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
import { SERVER_URL } from '../../config';
import { Url } from '../../Url';
import { useNavigate } from 'react-router-dom';
import loginLogo from './../../images/Login.png'
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [alert, setAlert] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmitLogin = async () => {
        await fetch(SERVER_URL+Url.LOGIN,{
            method: 'POST',
            body: JSON.stringify({
                name: userName,
                password: userPwd
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
             },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            setUserName("")
            setUserPwd("")
            setAlert(true)
            console.log("Login Failed");
        })
        .then((data) => {
            if(data.role === "Admin") {
                login(data);
                navigate("/admin/home", {replace: true})
            } else {
                setUserName("")
                setUserPwd("")
                setAlert(true)
                console.log("Login Failed");
            }
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

    return (
        <div className='container'>
            <div className='img-box'>
                <h1>&lt; / &gt; LUMA Loans</h1>
                <img src={loginLogo} alt="login" />
            </div>
            <div className='login-box'>
                <h2 className='mb-3'>Admin Login</h2>
                <div style={{ width: "70%" }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id="adminID"
                        className='mb-3'
                        value={userName}
                        onChange={(e) => (setUserName(e.target.value))}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="adminPwd"
                        className='mb-4'
                        value={userPwd}
                        onChange={(e) => (setUserPwd(e.target.value))}
                    />
                    { alert ? 
                        <div className="alert alert-danger" role="alert">
                            Username or Password is Incorrect!!!
                        </div> : <></>
                    }
                    <Button variant="primary" type="submit" style={{ width: "100%" }} size="lg" className='mb-3' onClick={onSubmitLogin}>
                        Submit
                    </Button>
                    <div style={{textAlign:"center"}}>
                        <span>Not an admin? </span><a href="/user/login">User Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
