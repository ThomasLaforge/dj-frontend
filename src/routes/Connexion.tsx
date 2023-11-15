import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Connexion() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }, [])

    const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }, [])

    const handleConnect = useCallback(async () => {
        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: email,
                password: password
            })
        })
        const data = await response.json()
        if(data.jwt) {
            navigate('/home')
        }
        else {
            setEmail('')
            setPassword('')
        }
    }, [email, password, navigate])

    return <div className="connexion page">
        <div className="header">
            <h1>Connexion</h1>
        </div>
        <div className="form">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={handleChangeEmail} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" value={email} onChange={handleChangePassword} />
            <button onClick={handleConnect}>Connexion</button>
        </div>
    </div>
}