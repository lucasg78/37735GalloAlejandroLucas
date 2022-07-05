import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./ItemCount.scss";
import { Button } from "react-bootstrap";

export const ItemCount = ({ stock, initial, onAdd }) => {
    const [counter, setCounter] = useState(initial);

    const incrementar = () => {
        if (counter < stock) {
            setCounter(counter + 1);
        }
    };

    const decrementar = () => {
        if (counter > initial) {
            setCounter(counter - 1);
        }
    };

    const onAddToCart = () => {
        onAdd(counter);
    };

    if (stock === 0) {
        return (
            <h5 className="noStock">SIN STOCK</h5>
        )
    }

    return (
        <div className="container">
            <div className="stock">Stock {stock} unidades</div>
            <div className="controles">
                <button className="button1" onClick={incrementar}>
                    +
                </button>
                <button className="buttonCounter">{counter}</button>
                <button className="button2" onClick={decrementar}>
                    -
                </button>
            </div>
            <Button variant="secondary" size="sm" className="btnAddToCart" onClick={() => onAddToCart(counter)}>
                Agregar al carrito
            </Button>
        </div>
    );
};