import './Item.scss'
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"

const Item = ({ item }) => {

    return (
        <Card style={{ width: '18rem' }} className="cardItem">
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Card.Text><strong>Precio: ${item.price}</strong></Card.Text>
                <Button variant="primary">Detalle</Button>
            </Card.Body>
        </Card>
    )
}

export default Item