import "bootstrap/dist/css/bootstrap.min.css";
import ItemDetail from "./ItemDetail";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getItem } from "../../mock/pedirDatos";

export const ItemDetailContainer = ({ item }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        getItem(item.id)
            .then((resp) => {
                console.log(resp);
                setItems(resp);
                console.log(items);
            })
            .catch((error) => {
                console.log("ERROR", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section>
            {loading ? (
                <Spinner animation="grow" variant="secondary" className="spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <ItemDetail items={items} />
            )}
        </section>
    );
};

export default ItemDetailContainer;