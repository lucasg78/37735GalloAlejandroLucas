import './Navbar.scss'
import { CartWidget } from "../CartWidget/CartWidget";

export const Navbar = (props) => {
    const { itemsCart } = props;
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__logo">Ahumadero Ushuaia</h1>

                <nav className="header__navbar">
                    <p className="header__navlink">Conservas</p>
                    <p className="header__navlink">Picadas</p>
                    <p className="header__navlink">Pescado</p>
                    <CartWidget itemsCart={itemsCart} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;