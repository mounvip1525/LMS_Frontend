import React from 'react'
import '../../styles/Login.css'
import { Form, Button } from 'react-bootstrap'
export default function AdminLogin() {
    return (
        <div className='container'>
            <div className='img-box'>
                <h1>&lt; / &gt; LUMA Loans</h1>
                <img src="login.png" alt="login" />
            </div>
            <div className='login-box'>
                <h2 className='mb-3'>Admin Login</h2>
                <div style={{ width: "70%" }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id="adminID"
                        className='mb-3'
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="adminPwd"
                        className='mb-4'
                    />
                    <Button variant="primary" type="submit" style={{ width: "100%" }} size="lg" className='mb-3'>
                        Submit
                    </Button>
                    <div style={{textAlign:"center"}}>
                        <span>Not an admin?</span><a href="/user/login">User Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
