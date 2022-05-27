import { Badge } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";

export const CartWidget = (props) => {
    const { itemsCart } = props;
    return (
        <section>
            <BsCartPlus className="cart"/>
            {itemsCart > 0 && <Badge bg="success">{itemsCart}</Badge>}
        </section>
    );
};

export default CartWidget;