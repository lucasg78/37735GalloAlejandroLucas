import { Link, } from "react-router-dom"
import { Button } from "react-bootstrap"
import './EmptyCart.scss'

const EmptyCart = () => {

    return (
        <div className="emptyCart">
            <h3 className="detailEmptyCart">Tu carrito está vacío</h3>
            <hr />
            <Link to="/">
                <Button variant="primary" className="goShopping">Ir a comprar</Button>
            </Link>
        </div>
    )
}

export default EmptyCart



