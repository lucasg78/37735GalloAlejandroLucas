import { useState } from "react"
import { useCartContext } from "../../context/CartContext"
import { Navigate } from 'react-router-dom'
import { collection, getDocs, addDoc, writeBatch, query, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/config"
import './Checkout.scss'
import Swal from 'sweetalert2';

const Checkout = () => {

    const { cart, totalPrice, emptyCart } = useCartContext()

    const [orderId, setOrderId] = useState(null)
    const [values, setValues] = useState({
        nombre: '',
        email: '',
        direccion: ''
    })

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (values.nombre.length < 5) {
            Swal.fire({
                icon: "warning",
                title: "El nombre es demasiado corto",
            })
            return
        }
        if (values.email.length < 5) {
            Swal.fire({
                icon: "warning",
                title: "El email es inválido",
            })
            return
        }
        if (values.direccion.length < 5) {
            Swal.fire({
                icon: "warning",
                title: "La dirección no es correcta",
            })
            return
        }

        const orden = {
            buyer: values,
            items: cart.map(({ id, cantidad, name, price }) => ({ id, cantidad, name, price })),
            total: totalPrice()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")
        const q = query(productosRef, where(documentId(), 'in', cart.map(item => item.id)))

        const outOfStock = []
        const productos = await getDocs(q)

        productos.docs.forEach((doc) => {
            const itemToUpdate = cart.find(prod => prod.id === doc.id)

            if ((doc.data().stock - itemToUpdate.cantidad) >= 0) {
                batch.update(doc.ref, {
                    stock: doc.data().stock - itemToUpdate.cantidad
                })
            } else {
                outOfStock.push(itemToUpdate)
            }
        })

        if (outOfStock.length === 0) {
            addDoc(ordersRef, orden)
                .then((doc) => {
                    batch.commit()
                    setOrderId(doc.id)
                    emptyCart()
                })
        } else {
            console.log(outOfStock)
            Swal.fire({
                icon: "warning",
                title: "Hay items sin stock",
            })
        }
    }
    if (orderId) {
        Swal.fire({
            icon: "success",
            title: "¡Gracias por su compra!",
            text: `Su número de orden es: ${orderId}`,
        })
    }

    if (cart.length === 0) {
        return <Navigate to="/" />
    }

    return (
        <div className="containerCheckOut">
            <h3 className="detailCheckOut">Checkout</h3>
            <hr />

            <form onSubmit={handleSubmit}>
                <input
                    value={values.nombre}
                    name="nombre"
                    onChange={handleInputChange}
                    type={"text"}
                    placeholder="Nombre y apellido"
                    className="form-control inputSize my-2"
                />
                <input
                    value={values.email}
                    name="email"
                    onChange={handleInputChange}
                    type={"text"}
                    placeholder="email@example.com"
                    className="form-control inputSize my-2"
                />
                <input
                    value={values.direccion}
                    name="direccion"
                    onChange={handleInputChange}
                    type={"text"}
                    placeholder="Dirección"
                    className="form-control inputSize my-2"
                />

                <button type="submit" className="btnSend">Enviar</button>

            </form>
            <button onClick={emptyCart} className="btnCancel">Cancelar mi compra</button>
        </div>
    )
}

export default Checkout