import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { pedirDatos } from "../../mock/pedirDatos"
import ItemList from "./ItemList"
import "./ItemListContainer.scss";

export const ItemListContainer = () => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        pedirDatos()
            .then((resp) => {
                setItems( resp )
            })
            .catch((error) => {
                console.log('ERROR', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <section>
            
            {
                loading
                ?   <Spinner animation="grow" variant="secondary" className="spinner">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>

                :  <ItemList items={items}/> 
            }
            
        </section>
    )
}


