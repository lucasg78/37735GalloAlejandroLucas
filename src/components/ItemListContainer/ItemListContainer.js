import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { pedirDatos } from "../../mock/pedirDatos";
import ItemList from "./ItemList";
import "./ItemListContainer.scss";
import { useParams } from "react-router-dom";

function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}
export const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Tienda");
    const { idCategory } = useParams();

    useEffect(() => {
        setLoading(true);

        pedirDatos()
            .then((resp) => {
                if (!idCategory) {
                    setTitle("Tienda");
                    setItems(resp);
                } else {
                    setItems(resp.filter((item) => item.category === idCategory));
                    setTitle(capitalize(idCategory));
                }
            })
            .catch((error) => {
                console.error("Error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idCategory]);

    return (
        <section>
            {loading ? (
                <Spinner animation="grow" variant="secondary" className="spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <ItemList titulo={title} items={items} />
            )}
        </section>
    );
};


