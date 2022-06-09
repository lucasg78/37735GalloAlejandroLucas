import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ItemCount } from "./ItemCount";
import GoToCart from './GoToCart';
import './ItemDetail.scss'

const ItemDetail = ({ item }) => {

    const [cantidad, setCantidad] = useState(0)

    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1);
    };

    const onAddToCart = (counter) => {
        alert(`${counter} items agregados al carrito`);
        console.log(counter);
        setCantidad(counter)
    }

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
                <Card.Link href="#" className="itemDetailPago">Ver los medios de pago</Card.Link>
            </Card.Body>
            <div>
                {
                    cantidad === 0 ?
                        <ItemCount stock={item.stock} initial={0} onAdd={onAddToCart}
                        /> : <GoToCart />
                }
            </div>
            <Button variant="secondary" size="sm" className="btnVolver" onClick={handleVolver}>VOLVER</Button>
        </Card>
    );
};

export default ItemDetail;