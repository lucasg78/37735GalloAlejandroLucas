import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import {
    collection,
    getDocs,
    addDoc,
    writeBatch,
    query,
    where,
    documentId,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import "./Checkout.scss";
import Swal from "sweetalert2";
import { CardGroup, Card } from "react-bootstrap";
import PriceFormat from "../PriceFormat/PriceFormat";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
    calle: Yup.string()
        .required("Este campo es obligatorio")
        .min(4, "El nombre es demasiado corto")
        .max(30, "Máximo 30 caracteres"),
    puerta: Yup.string()
        .required("Este campo es obligatorio")
        .min(3, "El número debe tener al menos tres dígitos (ej. 001)")
        .max(5, "Máximo 5 dígitos"),
    entrecalles: Yup.string()
        .required("Este campo es obligatorio")
        .min(4, "El nombre es demasiado corto")
        .max(30, "Máximo 30 caracteres"),
});

const Checkout = () => {
    const { cart, totalPrice, totalQuantity, emptyCart } = useCartContext();

    const [orderId, setOrderId] = useState(null);

    const { auth } = useAuthContext();

    const generarOrden = async (values) => {
        delete auth.loggedIn;
        const orden = {
            buyer: auth,
            items: cart.map(({ id, cantidad, name, price }) => ({
                id,
                cantidad,
                name,
                price,
            })),
            total: totalPrice(),
        };

        const batch = writeBatch(db);
        const ordersRef = collection(db, "orders");
        const productosRef = collection(db, "productos");
        const q = query(
            productosRef,
            where(
                documentId(),
                "in",
                cart.map((item) => item.id)
            )
        );

        const outOfStock = [];
        const productos = await getDocs(q);

        productos.docs.forEach((doc) => {
            const itemToUpdate = cart.find((prod) => prod.id === doc.id);

            if (doc.data().stock - itemToUpdate.cantidad >= 0) {
                batch.update(doc.ref, {
                    stock: doc.data().stock - itemToUpdate.cantidad,
                });
            } else {
                outOfStock.push(itemToUpdate);
            }
        });

        if (outOfStock.length === 0) {
            addDoc(ordersRef, orden).then((doc) => {
                batch.commit();
                setOrderId(doc.id);
                emptyCart();
            });
        } else {
            console.log(outOfStock);
            Swal.fire({
                icon: "warning",
                title: "Hay items sin stock",
            });
        }
    };

    if (orderId) {
        Swal.fire({
            icon: "success",
            title: "¡Gracias por su compra!",
            text: `Código de seguimiento: ${orderId}`,
        });
    }

    if (cart.length === 0) {
        return <Navigate to="/" />;
    }

    return (
        <div className="containerCheckOut">
            <h3 className="detailCheckOut">Checkout</h3>
            <hr />

            <CardGroup>
                <Card className="card">
                    <Card.Body>
                        <Card.Title className="identTitle">Identificación</Card.Title>
                        <Card.Text>
                            <p className="cardText2">
                                <strong>Nombre y apellido:&nbsp;</strong>
                                {auth.userName}
                            </p>
                        </Card.Text>
                        <Card.Text>
                            <p className="cardText2">
                                <strong>E-mail:&nbsp;</strong>
                                {auth.userId}
                            </p>
                        </Card.Text>
                        <Card.Text>
                            <p className="cardText2">
                                <strong>Teléfono:&nbsp;</strong>
                                {auth.userPhone}
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                {
                    <Card>
                        <Card.Body>
                            <Card.Title className="identTitle">Resumen del pedido</Card.Title>
                            <Card.Text>
                                <p className="cardText2">
                                    <strong>Cantidad de items:&nbsp;</strong>
                                    {totalQuantity()}
                                </p>
                            </Card.Text>
                            <Card.Text>
                                <p className="cardText2">
                                    <strong>Subtotal:&nbsp;</strong>
                                    <PriceFormat price={totalPrice()} />
                                    &nbsp;+ <strong>Costo de envío:</strong> $200
                                </p>
                            </Card.Text>

                            <Card.Text>
                                <p className="cardText2">
                                    <strong>Total a pagar:&nbsp;</strong>
                                    <PriceFormat price={totalPrice() + 200} />
                                </p>
                            </Card.Text>
                            <Card.Text></Card.Text>
                        </Card.Body>
                    </Card>
                }

                <Card>
                    <Card.Body>
                        <Card.Title className="identTitle">Datos de envío</Card.Title>
                        <Card.Text>
                            <Formik
                                initialValues={{
                                    calle: "",
                                    puerta: "",
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
                                        {formik.errors.calle && (
                                            <p className="alertError">{formik.errors.calle}</p>
                                        )}
                                        <br />
                                        <input
                                            value={formik.values.puerta}
                                            name="puerta"
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            placeholder="Número de puerta"
                                            className="inputSize"
                                        />
                                        {formik.errors.puerta && (
                                            <p className="alertError">{formik.errors.puerta}</p>
                                        )}
                                        <br />
                                        <input
                                            value={formik.values.entrecalles}
                                            name="entrecalles"
                                            onChange={formik.handleChange}
                                            type={"text"}
                                            placeholder="Entre calles (referencia)"
                                            className="inputSize"
                                        />
                                        {formik.errors.entrecalles && (
                                            <p className="alertError">{formik.errors.entrecalles}</p>
                                        )}
                                        <br />
                                        <div className="btns">
                                            <button type="submit" className="btnSend">
                                                Comprar
                                            </button>
                                            <button onClick={emptyCart} className="btnCancel">
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
};

export default Checkout;