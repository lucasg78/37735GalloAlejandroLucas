import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemCount } from "./ItemCount";
import "./ItemDetail.scss";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ item }) => {
    const { addItem, isInCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleVolver = () => {
        navigate("/");
    };

    const onAddToCart = (cantidad) => {
        const itemToCart = {
            ...item,
            cantidad,
        };
        addItem(itemToCart);
    };

    return (
        <Card style={{ width: "18rem" }} className="itemDetail">
            <div className="imgContainer">
                <Card.Img variant="top" src={item.img} className="img" />
            </div>
            <Card.Body className="itemCard">
                <Card.Title className="itemDetailName">{item.name}</Card.Title>
                <Card.Text className="itemDetailDesc">{item.desc}</Card.Text>
                <Card.Text className="itemDetailSize">{item.size}</Card.Text>
                <Card.Text className="itemDetailPrice">${item.price}</Card.Text>
                <Card.Link href="#" className="itemDetailPago">
                    Ver los medios de pago
                </Card.Link>
            </Card.Body>
            {isInCart(item.id) ? (
                <Link to="/cart">
                    <Button variant="secondary" size="sm" className="btnCart">Terminar mi compra</Button>
                </Link>
            ) : (
                <ItemCount stock={item.stock} initial={1} onAdd={onAddToCart} />
            )}
            <Button
                variant="secondary" size="sm" className="btnContinue" onClick={handleVolver}>
                Seguir comprando
            </Button>
        </Card>
    );
};

export default ItemDetail;