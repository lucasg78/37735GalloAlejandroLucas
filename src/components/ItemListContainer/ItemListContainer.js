import { Button } from "react-bootstrap"
export const ItemListContainer = ({ producto }) => {

    return (
        <section className="container my-5">
            <h2>Nuestros productos</h2>
            <hr />

            <p>Bienvenido {producto}</p>

            <Button variant="success" size="sm">INGRESAR</Button>
        </section>
    )
}