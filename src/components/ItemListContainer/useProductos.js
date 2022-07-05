import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"

export const useProductos = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { idCategory } = useParams();

    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, "productos")
        const q = idCategory ? query(productosRef, where("category", "==", idCategory)) : productosRef

        getDocs(q)
            .then((resp) => {
                const newItems = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setItems(newItems)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [idCategory]);

    return {
        items, loading
    }
}