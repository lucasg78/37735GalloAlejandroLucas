import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { useState } from "react";

const INIT_VALUE_CART = 0;

function App() {
  const [itemsCart, setItemsCart] = useState(INIT_VALUE_CART);
  const add2Cart = (value) => {
    const count = itemsCart + value;
    setItemsCart(count);
  };
  const resetCart = () => {
    setItemsCart(INIT_VALUE_CART) 
  }

  const productos = [
    {
      id: "1",
      name: "Centolla",
      tipe: "natural",
      price: "$1.200",
    },
  ];

  return (
    <div>
      <Navbar itemsCart={itemsCart} />
      <ItemListContainer productos={productos} add2Cart={add2Cart} resetCart={resetCart}/>
    </div>
  );
}

export default App;
