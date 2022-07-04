import { Spinner } from "react-bootstrap"
import "./Loader.scss";

const Loader = () => {

    return (
        <Spinner animation="grow" variant="secondary" className="spinner">
            <div className="loadingSpinner">Loading...</div>
        </Spinner>
    )
}

export default Loader