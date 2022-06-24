import { useState } from "react"
import { useCartContext } from "../../context/CartContext"
import { Navigate } from 'react-router-dom'
import { collection, getDocs, addDoc, writeBatch, query, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/config"
import './Checkout.scss'
import Swal from 'sweetalert2';
import { Formik } from "formik"
import * as Yup from 'yup'

const schema = Yup.object().shape({
    nombre: Yup.string()
        .required('Este campo es obligatorio')
        .min(4, 'El nombre es demasiado corto')
        .max(30, 'Máximo 30 caracteres'),
    email: Yup.string()
        .required('Este campo es obligatorio')
        .email('Formato de email inválido'),
    direccion: Yup.string()
        .required('Este campo es obligatorio')
        .min(4, 'La dirección es demasiado corta')
        .max(30, 'Máximo 30 caracteres'),
})

const Checkout = () => {

    const { cart, totalPrice, emptyCart } = useCartContext()

    const [orderId, setOrderId] = useState(null)

    const generarOrden = async (values) => {

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

            <Formik
                initialValues={{
                    nombre: '',
                    email: '',
                    direccion: ''
                }}
                onSubmit={generarOrden}
                validationSchema={schema}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            value={formik.values.nombre}
                            name="nombre"
                            onChange={formik.handleChange}
                            type={"text"}
                            placeholder="Alejandro Lucas "
                            className="form-control my-2"
                        />
                        {formik.errors.nombre && <p className="alert alert-danger">{formik.errors.nombre}</p>}

                        <input
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            type={"text"}
                            placeholder="alejandro.lucas@gallo.com"
                            className="form-control my-2"
                        />
                        {formik.errors.email && <p className="alert alert-danger">{formik.errors.email}</p>}

                        <input
                            value={formik.values.direccion}
                            name="direccion"
                            onChange={formik.handleChange}
                            type={"text"}
                            placeholder="Calle Principal 123"
                            className="form-control my-2"
                        />
                        {formik.errors.direccion && <p className="alert alert-danger">{formik.errors.direccion}</p>}

                        <button type="submit" className="btnSend">Enviar</button>
                    </form>
                )}
            </Formik>

            <button onClick={emptyCart} className="btnCancel">Cancelar mi compra</button>
        </div>
    )
}


export default Checkout