import React from 'react'

const Clima = ({resultado}) => {

    const {name, main, weather} = resultado;

    if(!name) return null;

    // Kelvin -> Celsius
    const kelvin=273;

    return ( 
        <div className="container">
            <div className="clima">
                <div className="row titClima">
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <h2>Clima de {name}</h2> 
                    </div>
                    <div className="col-sm-4 col-md-3 col-lg-2">
                        <img src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}/>
                    </div>   
                </div>
                <hr/>
                <p><strong>Temperatura actual: </strong>{parseFloat(main.temp-kelvin,10).toFixed(2)}
                    <span> &#x2103;</span>
                </p>

                <p><strong>Humedad: </strong> {main.humidity} %</p>
                
                <p><strong>Temperatura Máxima: </strong> {parseFloat(main.temp_max-kelvin,10).toFixed(2)}
                    <span> &#x2103;</span>
                </p>

                <p><strong>Temperatura Mínima: </strong>{parseFloat(main.temp_min-kelvin,10).toFixed(2)}
                    <span> &#x2103;</span>
                </p>
            </div>
        </div>
     );
}
 
export default Clima;