import React, { useState } from 'react'
import '../../styles/Login.css'
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap'
import loginLogo from './../../images/Login.png'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import { Url } from '../../Url';

export default function UserLogin() {
    const [validated, setValidated] = useState(false);
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [alert, setAlert] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmitLogin = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            console.log(1)
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
                if(data.role === "User") {
                    login(data);
                    navigate("/user/home", {replace: true})
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
        } else {
            console.log(2)
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
    }

    return (
        <div className='container'>
            <div className='img-box'>
                <h1>&lt; / &gt; LUMA Loans</h1>
                <img src={loginLogo} alt="login" />
            </div>
            <div className='login-box'>
                <h2 className='mb-3'>User Login</h2>
                <div style={{ width: "70%" }}>
                    <Form noValidate validated={validated} onClick={onSubmitLogin}>
                    {/* <Form.Group md="3"> */}
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id="userID"
                        className='mb-3'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                    {/* </Form.Group> */}
                    {/* <Form.Group md="3"> */}
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="userPwd"
                        className='mb-4'
                        value={userPwd}
                        onChange={(e) => (setUserPwd(e.target.value))}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                    {/* </Form.Group> */}
                    { alert ? 
                        <div className="alert alert-danger" role="alert">
                            Username or Password is Incorrect!!!
                        </div> : <></>
                    }
                    <Button variant="primary" type="submit" style={{ width: "100%" }} size="lg" className='mb-3'>
                        Submit
                    </Button>
                    </Form>
                    <div style={{ textAlign: "center" }}>
                        <span>Admin Login Link: </span><a href="/admin/login">Here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
