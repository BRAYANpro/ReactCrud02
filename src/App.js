
import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';



function App() {
  

  

  
  const baseUrl = ("http://bagp.lovestoblog.com/");
     
  
  const[data, setData]=useState([]);
  //para que los modales simpre esten cerrados al iniciar el sitio web//
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  /*variables vacias donde almacenara el imput */
  const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({

      id:'',
      nombre:'',
      lanzamiento:'',
      desarrollador:''
  });
/*  esta parte de el codigo es para que pueda detectar todo lo que se escribe
lo guarda en la variable name con el name de el imput y le almacena el valor*/
  const handleChange=e=>{
    const {name, value}=e.target;
    setFrameworkSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(frameworkSeleccionado);
  }
/*--------------------------------------------------*/ 

//son parapoder abrir los modales y poderlos cerrar//
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  /*----------------------------------------------------------*/

  //el metodo GET
  const peticionGet=async()=>{
    await axios.get(baseUrl).then(Response=>{
      setData(Response.data);
    }).catch(error=>{
    console.log(error);
  })
}

  //el metodo POST
  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }
  //el metodo PUT
  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", frameworkSeleccionado.nombre);
    f.append("lanzamiento", frameworkSeleccionado.lanzamiento);
    f.append("desarrollador", frameworkSeleccionado.desarrollador);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(Response=>{
      var dataNueva= data;
      dataNueva.forEach(framework=>{
        if(framework.id===frameworkSeleccionado.id){
          framework.nombre=frameworkSeleccionado.nombre;
          framework.lanzamiento=frameworkSeleccionado.lanzamiento;
          framework.desarrollador=frameworkSeleccionado.desarrollador;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  //el metodo DELETE
  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: frameworkSeleccionado.id}})
    .then(Response=>{
      setData(data.filter(framework=>framework.id!==frameworkSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
/* este nos sirvepara saber en que lugar de la base de datos estoy posicionado y asi poder obtener el id
para poder eliminar o editar*/
  const seleccionarFramework=(framework, caso)=>{
    setFrameworkSeleccionado(framework);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
//-----------------------------------------------------------------------------

//PARA LLENAR LA TABLA
  useEffect(()=>{
    peticionGet();
  },[])
  return (
    <div style={{textAlign:'center'}}>
      <br/>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <table className="table table-striped">
        <thead><tr>
      <th>ID</th>
        <th>nombre</th>
        <th>Lanzamiento</th>
        <th>Desarrollador</th>
        </tr>
        </thead>
        
        <tbody>
          
          {
            /* este funciona como un ford para poder 
            iterar en los elementos de la BD "data.map"*/
          data.map(framework=>(
            <tr key={framework.id}>
              <td>
                {framework.id}
                </td>
                <td>
                {framework.nombre}
                </td>
                {framework.lanzamiento}
                <td>
                {framework.desarrollador}
              </td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
            
    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Framework</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>Lanzamiento: </label>
          <br />
          <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
          <br />
          <label>Desarrollador: </label>
          <br />
          <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Framework</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
          <br />
          <label>Lanzamiento: </label>
          <br />
          <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}/>
          <br />
          <label>Desarrollador: </label>
          <br />
          <input type="text" className="form-control" name="desarrollador" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Framework {frameworkSeleccionado && frameworkSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
