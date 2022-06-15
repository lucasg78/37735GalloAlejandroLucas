import { useCartContext } from "../../context/CartContext";
import { BsTrashFill } from "react-icons/bs";
import Table from 'react-bootstrap/Table'
import './Cart.scss'
import EmptyCart from "./EmptyCart"

const Cart = () => {
  const { cart, totalPrice, emptyCart, removeItem } = useCartContext();
  if (cart.length === 0) return <EmptyCart/>
  return (
    <div className="containerCart">
      <h3 className="detailCart">Detalle de la compra</h3>
      <hr />

      {cart.map((item) => (
        <Table striped bordered hover size="lg" className="table">
          <thead>
            <tr>
              <th className="text-center title">Item</th>
              <th className="text-center title">Precio </th>
              <th className="text-center title">Cantidad</th>
              <th className="text-center title">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="tableRows">
              <td className="text-center detail tdItem">{item.name}</td>
              <td className="text-center detail tdResto">${item.price}</td>
              <td className="text-center detail tdResto">{item.cantidad}</td>
              <td className="text-center detail tdResto">${item.price * item.cantidad}</td>
              <td className="text-center tdTrash"><button className="btnRemove"
                onClick={() => removeItem(item.id)}
              >
                <BsTrashFill />
              </button></td>
            </tr>
          </tbody>
        </Table>
      ))}

      {
        <div className="containerTotalPrice">
          <h5 className="totalPrice">TOTAL ${totalPrice()}</h5>
        </div>
      }

      <button onClick={emptyCart} className="btnEmptyCart">
        Vaciar carrito
      </button>
    </div>
  );
};

export default Cart;
