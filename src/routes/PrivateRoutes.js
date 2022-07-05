import { ItemListContainer } from '../components/ItemListContainer/ItemListContainer'
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { ItemDetailContainer } from '../components/ItemDetailContainer/ItemDetailContainer';
import Cart from '../components/Cart/Cart';
import { Routes, Route, Navigate } from 'react-router-dom'
import UserInfo from '../components/UserInfo/UserInfo';
import Checkout from '../components/Checkout/Checkout';

const PrivateRoutes = () => {

    return (
        <>
            <Navbar />
            <UserInfo />
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:idCategory" element={<ItemListContainer />} />
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                <Route path="*" element={<Navigate to={"/"} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/checkout' element={<Checkout/>} />
            </Routes>
            <Footer />
        </>
    )
}

export default PrivateRoutes