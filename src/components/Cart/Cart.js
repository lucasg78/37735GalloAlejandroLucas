import { useCartContext } from "../../context/CartContext";
import { BsTrashFill } from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import './Cart.scss';
import { Button } from "react-bootstrap";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PriceFormat from "../PriceFormat/PriceFormat";

const Cart = () => {

  const { cart, totalPrice, emptyCart, removeItem } = useCartContext();

  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/");
  };

  if (cart.length === 0) return <EmptyCart />
  return (
    <div className="containerCart">
      <h3 className="detailCart">Detalle de tu compra</h3>
      <hr />

      <Table striped bordered hover size="lg" className="table">
        <thead>
          <tr>
            <th className="text-center title tdItem">Item</th>
            <th className="text-center title tdResto">Precio </th>
            <th className="text-center title tdResto">Cantidad</th>
            <th className="text-center title tdResto">Subtotal</th>
            <th></th>
          </tr>
        </thead>
      </Table>

      {cart.map((item) => (
        <Table striped bordered hover size="lg" className="table">
          <tbody>
            <tr className="tableRows">
              <td className="text-start detail tdItem">{item.name}</td>
              <td className="text-center detail tdResto"><PriceFormat price={item.price} /></td>
              <td className="text-center detail tdResto">{item.cantidad}</td>
              <td className="text-center detail tdResto"><PriceFormat price={item.price * item.cantidad} /></td>
              <td className="text-center tdTrash">
                <button className="btnRemove" onClick={() => removeItem(item.id)}>
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      ))}

      {
        <Table striped bordered hover size="lg" className="table">
          <tbody>
            <tr className="tableRows">
              <td className="tdTotal">TOTAL</td>
              <td className="tdTotalPesos"><PriceFormat price={totalPrice()} /></td>
              <td className="text-center tdTrash">
                <button className="btnRemoveTotal" onClick={emptyCart}>
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      }

      {
        <div className="containerBtnCont">
          <Link to="/checkout">
            <Button
              variant="secondary" size="sm" className="btnFinShopping">
              Siguiente
            </Button>
          </Link>
        </div>
      }

      {
        <div className="containerBtnCont">
          <Button
            variant="secondary" size="sm" className="btnContShopping" onClick={handleVolver}>
            Seguir comprando
          </Button>
        </div>
      }

    </div >
  );
};

export default Cart;
