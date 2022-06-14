import './Navbar.scss'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    return (
        <header className="header">
            <div className="header__container">
                <Link to={"/"} className="link"><h1 className="header__logo">Ahumadero Ushuaia</h1></Link>
                <nav className="header__navbar">
                    <Link to={"/category/conservas"} className="link">
                        <p className="header__navlink">Conservas</p>
                    </Link>
                    <Link to={"/category/picadas"} className="link">
                        <p className="header__navlink">Picadas</p>
                    </Link>
                    <Link to={"/category/congelados"} className="link">
                        <p className="header__navlink">Congelados</p>
                    </Link>
                    <CartWidget />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;