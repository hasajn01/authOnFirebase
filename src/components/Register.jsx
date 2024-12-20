import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, {useState} from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Form, Button, Card } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await updateProfile(user, {displayName: username})

            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email
            })
            navigate('/')
        } catch (error) {
            console.error('Error signing up: ', error)
        }
    }
    return (

        <div className="login-container">
        <Card className="login-card">
            <Card.Body className="login-card-body">
                <h3>Register</h3>
                <Form onSubmit={handleRegister}>
                <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
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
                </Form>
            </Card.Body>
        </Card>
    </div>

    )
}

export default Register