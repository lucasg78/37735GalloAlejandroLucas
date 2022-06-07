import "./ItemList.scss";
import Item from "./Item";

const ItemList = ({ items, titulo }) => {
    return (
        <div>
            <h2 className="tituloTienda">{titulo}</h2>
            <hr />

            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;