import React from "react"
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token")
    const [auth, setauthState] = React.useState(false)

    const navigator = useNavigate()
    React.useEffect(() => {
        if (!token) {
            navigator("/login")
        } else {
            setauthState(true)
        }
    }, [token])
    return auth ? <>{children}</> : null
}