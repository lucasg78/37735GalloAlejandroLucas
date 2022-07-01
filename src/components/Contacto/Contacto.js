import { useState } from "react"


const Contacto = () => {

    const [values, setValues] = useState({
        nombre: '',
        email: '',
        direccion: ''
    })

    const handleInputChange = (e) => {       
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container my-5">
            <h2>Contacto</h2>
            <hr/>

            <form onSubmit={handleSubmit}>
                <h4>Datos personales</h4>

                <input
                    name="nombre"
                    onChange={handleInputChange}
                    value={values.nombre} 
                    placeholder="Nombre"
                    type={'text'}
                    className="form-control my-2"
                />

                <input
                    name="email"
                    value={values.email} 
                    onChange={handleInputChange}
                    placeholder="Email"
                    type={'email'}
                    className="form-control my-2"
                />

                <input 
                    name="direccion"
                    onChange={handleInputChange}
                    value={values.direccion}
                    placeholder="Dirección"
                    type={'text'}
                    className="form-control my-2"
                />

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}

export default Contacto