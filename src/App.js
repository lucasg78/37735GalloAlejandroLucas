import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "./components/Navbar/Navbar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from './components/Footer/Footer';
import { ItemDetailContainer } from './components/ItemListContainer/ItemDetailContainer';
import Cart from './components/ItemListContainer/Cart';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/category/:idCategory' element={<ItemListContainer />} />
        <Route path='/item/:itemId' element={<ItemDetailContainer />} />
        <Route path='*' element={<Navigate to={"/"} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
