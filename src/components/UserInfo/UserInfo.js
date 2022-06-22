import { useAuthContext } from "../../context/AuthContext"
import "./UserInfo.scss"
const UserInfo = () => {
    const {auth, logout} = useAuthContext()

    return (
        <div className="containerLog">
            <h5 className="welcomeLog">Bienvenido, {auth.userId}</h5>
            <button onClick={logout} className="btn btnLog btn-danger">Logout</button>
        </div>
    )
}

export default UserInfo