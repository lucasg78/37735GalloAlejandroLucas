import './Item.scss'
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Item = ({ item }) => {

    return (
        <Card style={{ width: '18rem' }} className="cardItem">
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Card.Text><strong>Precio ${item.price}</strong></Card.Text>
                <Link to={`/item/${item.id}`}>
                    <Button variant="primary">Detalle</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Item