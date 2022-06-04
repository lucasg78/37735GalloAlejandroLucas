import { Navbar } from "./components/Navbar/Navbar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemListContainer/ItemDetailContainer";
import { useState } from "react";

function App() {
  const [item, setItem] = useState(0);
  const setProd = (prod) => {
    console.log(prod);
    setItem(prod);
    console.log(item);
  };
  return (
    <div>
      <Navbar />

      {item ? (
        <ItemDetailContainer item={item} />
      ) : (
        <ItemListContainer
          setProd={setProd}
        />
      )}
    </div>
  );
}

export default App;
