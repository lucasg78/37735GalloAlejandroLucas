import { useState } from "react"
import { useCartContext } from "../../context/CartContext"
import { useAuthContext } from "../../context/AuthContext"
import { Navigate } from 'react-router-dom'
import { collection, getDocs, addDoc, writeBatch, query, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/config"
import './Checkout.scss'
import Swal from 'sweetalert2';
import { CardGroup, Card } from "react-bootstrap";
import { Formik } from "formik"
import * as Yup from 'yup'

const schema = Yup.object().shape({
    calle: Yup.string()
        .required('Este campo es obligatorio'),
    puerta: Yup.string()
        .required('Este campo es obligatorio'),
    entrecalles: Yup.string()
        .required('Este campo es obligatorio'),
})

const Checkout = () => {

    const { cart, totalPrice, totalQuantity, emptyCart } = useCartContext()

    const [orderId, setOrderId] = useState(null)

    const { auth } = useAuthContext()

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

            <CardGroup>

                <Card className="card">
                    <Card.Body>
                        <Card.Title className="identTitle">Identificación</Card.Title>
                        <Card.Text className="cardText"><h5><strong>Nombre y apellido: &nbsp;</strong>{auth.userName}</h5></Card.Text>
                        <Card.Text className="cardText"><h5><strong>E-mail: &nbsp;</strong> {auth.userId}</h5></Card.Text>
                        <Card.Text className="cardText"><h5><strong>Teléfono: &nbsp;</strong> {auth.userPhone}</h5></Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title className="identTitle">Datos de envío</Card.Title>
                        <Card.Text>

                            <Formik
                                initialValues={{
                                    calle: '',
                                    puerta: ''
                                }}
                                onSubmit={generarOrden}
                                validationSchema={schema}
                            >
                                {(formik) => (
                                    <form onSubmit={formik.handleSubmit}>
                                        <input
                                            value={formik.values.calle}
                                            name="calle"
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            placeholder="Nombre de la calle"
                                            className="inputSize"
                                        />
                                        {formik.errors.calle && <h5 className="alertError">{formik.errors.calle}</h5>}
                                        <br />
                                        <input
                                            value={formik.values.puerta}
                                            name="puerta"
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            placeholder="Número de puerta, piso y dpto"
                                            className="inputSize"
                                        />
                                        {formik.errors.puerta && <h5 className="alertError">{formik.errors.puerta}</h5>}
                                        <br />
                                        <input
                                            value={formik.values.entrecalles}
                                            name="entrecalles"
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            placeholder="Entre calles (referencia)"
                                            className="inputSize"
                                        />
                                        {formik.errors.entrecalles && <h5 className="alertError">{formik.errors.entrecalles}</h5>}
                                        <br />
                                        <div className="btns">
                                            <button type="submit" className="btnSend">Comprar</button>
                                            <button onClick={emptyCart} className="btnCancel">Cancelar</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>

                        </Card.Text>
                    </Card.Body>
                </Card>
                {
                <Card>
                    <Card.Body>
                        <Card.Title className="identTitle">Resumen de la compra</Card.Title>
                        <Card.Text className="cardText2"><h5><strong>Cantidad de items: &nbsp;</strong>{totalQuantity()}</h5></Card.Text>
                        <Card.Text className="cardText2"><h5><strong>Subtotal: &nbsp;</strong> ${totalPrice()}</h5></Card.Text>
                        <Card.Text className="cardText2"><h5><strong>Costo de envío: &nbsp;</strong> $200</h5></Card.Text>
                        <Card.Text className="cardText2"><h5><strong>Total a pagar: &nbsp;</strong> ${totalPrice()+200}</h5></Card.Text>
                        <Card.Text></Card.Text>

                    </Card.Body>
                </Card>
                }
            </CardGroup>






        </div>
    )
}


export default Checkout