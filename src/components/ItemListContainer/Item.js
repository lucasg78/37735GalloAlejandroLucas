import './Item.scss'
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import PriceFormat from "../PriceFormat/PriceFormat";

const Item = ({ item }) => {

    return (
        <Card style={{ width: '18rem' }} className="cardItem">
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
                <Card.Title className="cardName">{item.name}</Card.Title>
                <Card.Text className="cardDesc">{item.desc}</Card.Text>
                <Card.Text><strong>Precio&nbsp;<PriceFormat price={item.price}/></strong></Card.Text>
                <Link to={`/item/${item.id}`}>
                    <Button variant="primary" className="detailProduct">Detalle</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Item