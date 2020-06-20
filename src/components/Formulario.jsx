import React,{useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({busqueda, guardarBusqueda,guardarConsultar}) => {
    
    const [error, guardarError] =  useState(false);
    const [paises, guardarPaises] = useState([]);

    const {ciudad, pais} = busqueda;

    // Coloco los elementos en el state
    const handleChange = e =>{
        // actualizo state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // Submit al form
    const handleSubmit= e => {
        e.preventDefault();
    
        // Validar
        if(ciudad.trim()==='' || pais.trim()===''){
            guardarError(true);
            return;
        }
        guardarError(false);
    
        //Pasar al componente ppal
        guardarConsultar(true);
    
    }

    const paisesAPI = async () => {
        const pais_url = 'https://restcountries.eu/rest/v2/all';
      
        const resp_pais =  await fetch(pais_url);
        const paises_api = await resp_pais.json();
        guardarPaises(paises_api);   
    }

    useEffect(()=> {
        paisesAPI();
    },[ciudad, pais])

    return ( 
        <div className="container">
            <form onSubmit={handleSubmit}>
            {error? <Error mensaje="Ambos campos son obligatorios"/> : null}
                <div className="form-group">
                    <label>Pais</label>
                    <select 
                        className="form-control"
                        name="pais"
                        id="pais"
                        value={pais}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione pais...</option>
                        {paises.map(p=>(
                            <option key={p.alpha2Code} value={p.alpha2Code}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Ciudad</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="ciudad"
                        id="ciudad"
                        value={ciudad}
                        onChange={handleChange}
                        placeholder="Ingrese ciudad..."
                    />

                </div>
                <br/>
                <button type="submit" className="btn btn-outline-primary btn-sm btn-block">Obtener Clima</button>
            </form>           
        </div>
        
     );
}
 
export default Formulario;