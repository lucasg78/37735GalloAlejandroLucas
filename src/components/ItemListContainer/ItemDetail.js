import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ItemCount } from "./ItemCount";
import './ItemDetail.scss'

const ItemDetail = ({ item }) => {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1);
    };

    return (
        <Card style={{ width: "18rem" }} className="itemDetail">
            <Card.Img variant="top" src={item.img} className="img" />
            <Card.Body className="itemCard">
                <Card.Title className="itemDetailName">{item.name}</Card.Title>
                <Card.Text className="itemDetailDesc">{item.desc}</Card.Text>
                <Card.Text className="itemDetailSize">{item.size}</Card.Text>
                <Card.Text className="itemDetailPrice">${item.price}</Card.Text>
            </Card.Body>
            <ItemCount initial={0} stock={item.stock} />
            <Button variant="secondary" size="sm" className="btnVolver" onClick={handleVolver}>VOLVER</Button>
        </Card>
    );
};

export default ItemDetail;