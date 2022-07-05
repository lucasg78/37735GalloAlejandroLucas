import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.scss";
import Loader from "../Loader/Loader"
import { useProductos } from "./useProductos";

export const ItemListContainer = () => {

    const { items, loading } = useProductos()

    return (
        <section>
            {loading ? (
                <Loader />
            ) : (
                <ItemList items={items} />
            )}
        </section>
    );
};


