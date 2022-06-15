import { BsFillCartPlusFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import './CartWidget.scss'

const CartWidget = () => {

    const { totalQuantity } = useCartContext()

    return (
        <Link to="/cart" className="widget">
            <BsFillCartPlusFill className="cartIcon" />
            <span className="totalQ">{totalQuantity()}</span>
        </Link >
    )
}

export default CartWidget

