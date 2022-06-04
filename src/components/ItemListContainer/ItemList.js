import "./ItemList.scss";
import Item from "./Item";

const ItemList = ({ items, setProd }) => {
    return (
        <div>
            <h2 className="tituloTienda">Conservas</h2>
            <hr />

            {items.map((item) => (
                <Item key={item.id} item={item} setProd={setProd} />
            ))}
        </div>
    );
};

export default ItemList;