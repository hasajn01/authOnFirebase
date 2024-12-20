import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
                navigate('/login')
            }
        })
        return () => unsubscribe()
    }, [navigate])


    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigate('login')
        } catch (error) {
            console.error('Error signing out', error)
        }
    }
    return (
    <div>
        <h2>Home</h2>
        {user && <p>Welcome, {user.displayName} </p>}
        <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Home