import "bootstrap/dist/css/bootstrap.min.css";
import { CardGroup, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";
import "./ItemDetail.scss";
import { CartContext } from "../../context/CartContext";
import PriceFormat from "../PriceFormat/PriceFormat";

const ItemDetail = ({ item }) => {
    const { addItem, isInCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleVolver = () => {
        navigate("/");
    };

    const handleAtras = () => {
        navigate(-1);
    };

    const onAddToCart = (cantidad) => {
        const itemToCart = {
            ...item,
            cantidad,
        };
        addItem(itemToCart);
    };

    return (
        <CardGroup style={{ width: "40rem" }} className="itemDetailGroup">
            <Card className="itemDetail">
                <div className="imgContainer">
                    <Card.Img variant="top" src={item.img} className="img" />
                </div>
                <Card.Body className="itemCard">
                    <Card.Text className="itemDetailPrice"><PriceFormat price={item.price}/></Card.Text>
                </Card.Body>
                <Card.Link href="#" className="itemDetailPago">
                    Ver los medios de pago
                </Card.Link>
            </Card>
            <Card className="itemDetail">
                <Card.Body className="itemCard2">
                    <Card.Title className="itemDetailName">{item.name}</Card.Title>
                    <Card.Text className="itemDetailDesc">{item.desc}</Card.Text>
                    <Card.Text className="itemDetailSize">{item.size}</Card.Text>
                    <Card.Text></Card.Text>

                </Card.Body>
                {isInCart(item.id) ? (
                    <Link to="/cart">
                        <Button variant="secondary" size="sm" className="btnCart">Ir al carrito</Button>
                    </Link>
                ) : (
                    <ItemCount stock={item.stock} initial={1} onAdd={onAddToCart} />
                )}
                <Button
                    variant="secondary" size="sm" className="btnContinue1" onClick={handleAtras}>
                    Volver
                </Button>
                <Button
                    variant="secondary" size="sm" className="btnContinue2" onClick={handleVolver}>
                    Ir a Inicio
                </Button>
            </Card>
        </CardGroup>
    );
};

export default ItemDetail;