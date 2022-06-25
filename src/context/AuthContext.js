import { createContext, useContext, useState } from "react"

const mockUsers = [
    {email: 'alejandro.lucas@gallo.com', pass: 'gallo123'},
]

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({
        loggedIn: true,
        userId: "alejandro.lucas@gallo.com",
        userName: "Alejandro Lucas Gallo",
        userPhone:"341 4 567890",
    })

    const [error, setError] = useState({})

    const login = (values) => {
        const {email, password} = values
        
        setError({})

        const match = mockUsers.find((user) => user.email === email)

        if (match) {
            if (match.pass === password) {
                setAuth({
                    loggedIn: true,
                    userId: match.email
                })
            } else {
                setError({
                    password: "Password incorrecto"
                })
            }
        } else {
            setError({
                email: "Usuario no encontrado"
            })
        }

    }

    const logout = () => {
        setAuth({
            loggedIn: false,
            userId: null
        })
    }

    return (
        <AuthContext.Provider value={{auth, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}