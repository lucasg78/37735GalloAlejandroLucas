import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import './ItemCount.scss'

export const ItemCount = ({ stock, initial }) => {

    const [counter, setCounter] = useState(initial);

    const incrementar = () => {
        if (counter < stock) {
            setCounter(counter + 1);
        }
    }

    const decrementar = () => {
        if (counter > initial) {
            setCounter(counter - 1);
        }
    }

    return (
        <div className="container">
            <div className="stock">Stock {stock} unidades</div>
            <div className="controles">
                <button className="button1" onClick={incrementar}>+</button>
                <button className="buttonCounter">{counter}</button>
                <button className="button2" onClick={decrementar}>-</button>
            </div>
            <button className="carrito">Agregar al carrito</button>

        </div>
    );
}