import "./Item.scss";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Item = ({ item, setProd }) => {
    return (
        <Card style={{ width: "18rem" }} className="cardItem">
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Button variant="primary" onClick={() => { setProd(item) }}>Detalle</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;