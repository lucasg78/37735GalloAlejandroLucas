import { Button } from "react-bootstrap";
import "./ItemListContainer.scss";

export const ItemListContainer = (props) => {
    const { productos, add2Cart, resetCart} = props;
    return (
        <section className="container my-5">
            <h2 className="titulo">Nuestros productos</h2>
            <hr />

            {productos?.length > 0 &&
                productos.map((producto, index) => (
                    <div className="producto" key={index}>
                        <p> {producto.name} {producto.tipe} <br></br> <strong>{producto.price}</strong></p>
                        <Button onClick={() => add2Cart(1)}>+</Button>
                        <Button onClick={() => add2Cart(-1)}>-</Button>
                        <Button onClick={() => resetCart()}>Vaciar</Button>
                    </div>
                ))}
        </section>
    );
};