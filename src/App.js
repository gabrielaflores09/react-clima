import React,{useState, useEffect} from 'react';
import Error from './components/Error';
import Clima from './components/Clima';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});
  
  const [error, guardarError] = useState(false);

  const [cargando, continuarGuardando]= useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(()=>{
    
    if(consultar){
      const consultarAPI = async () => {
        const appId = '16df920543c9a57e3d6da53e9223dc45';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        // console.log(url);
        const respuesta= await fetch(url);
        const resultado= await respuesta.json();

        // Mostrar spinner
        continuarGuardando(true);
        // ocultar el spinner y mostrar resultado
        setTimeout(()=>{
        // Cambiar el estado de cargando
        continuarGuardando(false);

        guardarResultado(resultado);
      },2000)
          
        guardarConsultar(false);

        if(resultado.cod ==='404'){
          guardarError(true);
        }else {
          guardarError(false);
        }
      }

      consultarAPI();
    }
    
  },[consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados para su búsqueda"/>
  }else{
    componente=(cargando)? <Spinner/> : <Clima resultado={resultado}/>
  }

  return (
    <div className="container">
      <Header
        titulo="Clima"
      />
      <div className="cuerpo">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-10">
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-10">
            {componente}
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default App;
