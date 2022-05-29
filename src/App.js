import "./styles.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

function App() {

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
      <Navbar />
      <ItemListContainer productos={productos} />
    </div>
  );
}

export default App;
