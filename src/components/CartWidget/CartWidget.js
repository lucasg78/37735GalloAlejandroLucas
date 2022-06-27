import { BsFillCartPlusFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import './CartWidget.scss'

const CartWidget = () => {

    const { totalQuantity } = useCartContext()

    return (
        <Link to="/cart" className={`${totalQuantity() === 0 ? "d-none" : "widget"}`}>
            <span>
                <BsFillCartPlusFill className="cartIcon" title="Ver tu pedido"/>
                <span className="totalQ">{totalQuantity()}</span>
            </span>
        </Link >
    )
}

export default CartWidget

