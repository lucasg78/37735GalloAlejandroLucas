import './Navbar.scss'
import { CartWidget } from "../CartWidget/CartWidget";
import User from "../User/User";

export const Navbar = (props) => {
    const { itemsCart } = props;
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__logo">Ahumadero Ushuaia</h1>

                <nav className="header__navbar">
                    <p className="header__navlink">Enlace 1</p>
                    <p className="header__navlink">Enlace 2</p>
                    <p className="header__navlink">Enlace 3</p>
                    <User />
                    <CartWidget itemsCart={itemsCart} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;