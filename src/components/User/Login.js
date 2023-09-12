import React from 'react'
import '../../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
export default function UserLogin() {
    return (
        <div className='container'>
            <div className='img-box'>
                <h1>&lt; / &gt; LUMA Loans</h1>
                <img src="login.png" alt="login" />
            </div>
            <div className='login-box'>
                <h2 className='mb-3'>User Login</h2>
                <div style={{ width: "70%" }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id="userID"
                        className='mb-3'
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="userPwd"
                        className='mb-4'
                    />
                    <Button variant="primary" type="submit" style={{ width: "100%" }} size="lg" className='mb-3'>
                        Submit
                    </Button>
                    <div style={{ textAlign: "center" }}>
                        <span>Admin Login Link: </span><a href="/adminLogin">Here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
