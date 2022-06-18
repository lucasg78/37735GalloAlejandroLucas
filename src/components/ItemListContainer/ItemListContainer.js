import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import "./ItemListContainer.scss";
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"

export const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { idCategory } = useParams();

    useEffect(() => {
        setLoading(true);

        // 1. Armar la referencia
        const productosRef = collection(db, "productos")
        const q = idCategory ? query(productosRef, where("category", "==", idCategory)) : productosRef
        // 2. (async) Llamar a Firebase con la referencia anterior
        getDocs(q)
            .then((resp) => {
                const newItems = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                console.log(newItems)
                setItems(newItems)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [idCategory]);

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


