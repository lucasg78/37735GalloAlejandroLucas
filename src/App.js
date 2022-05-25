import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'


function App() {

  const articulo = {
    id: '1',
    producto: 'centolla',
    tipo: 'natural'
  }

  return (
    <div>
      <Navbar />

      <ItemListContainer producto={articulo.producto} />

    </div>
  );
}

export default App;
