import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.error('Error signing in: ', error)
        }
    }
    return (
        <div className="login-container">
        <Card className="login-card">
            <Card.Body className="login-card-body">
                <h3>Login</h3>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                    <h5 onClick={(e) => {
                        e.preventDefault()
                        navigate('/register')
                    }}>Not have account?</h5>
                </Form>
            </Card.Body>
        </Card>
    </div>
    )
}

export default Login