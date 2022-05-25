import './Nosotros.scss'


export const Nosotros = ( {titulo="Titulo por defecto", content="String por defecto"}) => {

    /* console.log(props) */

    /* const {titulo, content} = props */

    return (
        <section className="nosotros">
            <h2 className="nosotros__title">{titulo}</h2>
            <hr />
            <p>{content}</p>
        </section>
    )
}
