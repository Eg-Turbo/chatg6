import React from "react"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }) {
    const token = Cookies.get("token")
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