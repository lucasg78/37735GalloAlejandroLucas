import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom"
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"

export const ItemDetailContainer = () => {

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        // 1.- armar la referencia
        const docRef = doc(db, "productos", itemId)
        // 2.- llamar a firestore
        getDoc(docRef)
            .then((doc) => {
                setItem( {id: doc.id, ...doc.data()} )
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <section>

            {
                loading
                    ? <Loader />
                    : <ItemDetail item={item} />
            }

        </section>
    )
}