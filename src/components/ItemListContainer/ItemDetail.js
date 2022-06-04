import { Card } from "react-bootstrap";
import { ItemCount } from "./ItemCount";
import './ItemDetail.scss'

const ItemDetail = ({ items }) => {
    return (
        <Card style={{ width: "18rem" }} className="itemDetail">
            <Card.Img variant="top" src={items.img} className="img"/>
            <Card.Body>
                <Card.Title className="itemDetailName">{items.name}</Card.Title>
                <Card.Text className="itemDetailDesc">{items.desc}</Card.Text>
                <Card.Text className="itemDetailSize">{items.size}</Card.Text>
                <Card.Text className="itemDetailPrice">${items.price}</Card.Text>
            </Card.Body>
            <ItemCount stock={items.stock} initial={1} />
        </Card>
    );
};

export default ItemDetail;