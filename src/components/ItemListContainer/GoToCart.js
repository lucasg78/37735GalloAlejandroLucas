import { Link } from "react-router-dom";
import { Button } from "react-bootstrap"
import './GoToCart.scss'

const GoToCart = () => {
    return (

            <Link to='/Cart'>
                <Button className="carrito">
                    Ir al carrito
                </Button>
            </Link>

    );
}

export default GoToCart;