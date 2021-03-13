import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import "./../css/Menu.css";
import EditIcon from "@material-ui/icons/Edit";
import { Delete } from "@material-ui/icons";
import { AiOutlineUserAdd, AiOutlineEdit } from "react-icons/ai"

const data = [
    {nombre: "Jonathan", apellido: "Iasenza", pais: "Argentina", email: "jonaiasenza@gmail.com", dni: 12345678},
    {nombre: "Roberto", apellido: "Perez", pais: "España", email: "rperez@gmail.com", dni: 23456781},
    {nombre: "Julieta", apellido: "Gutierrez", pais: "Perú", email: "juli_gut@gmail.com", dni: 13456789},
    {nombre: "Lucía", apellido: "López", pais: "Uruguay", email: "lucilopez19@gmail.com", dni: 12356678 },
];

class TableUsers extends React.Component{
    state={
        data:data,
        form:{
            nombre:'',
            apellido:'',
            pais:'',
            email:'',
            dni:''
        },
        modalInsertar:false,
        modalEditar: false
    }

handleChange=e=>{
this.setState({
    form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
    }
   }
)}


mostrarModalInsertar=()=>{
this.setState({modalInsertar: true})
}

ocultarModalInsertar=()=>{
this.setState({modalInsertar: false})
}

mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form:registro})
}
    
ocultarModalEditar=()=>{
this.setState({modalEditar: false})
}

editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
    // eslint-disable-next-line eqeqeq
    if(dato.nombre===registro.nombre){
    lista[contador].apellido=dato.apellido;
    lista[contador].pais=dato.pais;
    lista[contador].email=dato.email;
    lista[contador].dni=dato.dni;
    }
    return contador++;
    });
    this.setState({data: lista,modalEditar:false});
};


insertar=()=>{
    var valorNuevo={...this.state.form};
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data:lista,modalInsertar:false});
}

eliminar=(dato)=>{    
    var opcion=window.confirm("Realmente desea eliminar el usuario " + dato.nombre + "?");
    if(opcion){
        var contador=0;
        var lista = this.state.data;
        lista.map((registro)=>{
            // eslint-disable-next-line eqeqeq
            if(registro.nombre==dato.nombre){
                lista.splice(contador,1);
            }
            return contador++;
        });
    this.setState({data:lista});
    }
}

    render(){
        return(
            <>
            <Container>
                <br/>
                <Button color="success" 
                onClick={()=>this.mostrarModalInsertar()}>Nuevo Usuario</Button>
                <br/><br/>

            <Table id="table-users">
            <thead>
                <tr id="tab">
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Email</th>
                    <th>DNI</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {this.state.data.map((elemento)=>(
                    <tr className="table-user">
                        <td>{elemento.nombre}</td>
                        <td>{elemento.apellido}</td>
                        <td>{elemento.pais}</td>
                        <td>{elemento.email}</td>
                        <td>{elemento.dni}</td>
                        <td><Button color="primary" 
                        onClick={()=>this.mostrarModalEditar(elemento)}><EditIcon/></Button></td>
                        <td><Button color="danger"
                        onClick={()=>this.eliminar(elemento)}><Delete/></Button></td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </Container>

            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div><h3>Agregar usuario <AiOutlineUserAdd/></h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input 
                        className="form-control" 
                        name="nombre" 
                        required="true"
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido: </label>
                        <input 
                        className="form-control" 
                        name="apellido" 
                        required="true"
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>País: </label>
                        <input 
                        className="form-control" 
                        name="pais" 
                        required="true"
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email: </label>
                        <input 
                        className="form-control" 
                        name="email" 
                        required="true"
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>DNI: </label>
                        <input 
                        className="form-control" 
                        name="dni" 
                        required="true"
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={()=>this.insertar()}>Agregar</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div><h3>Editar Usuario<AiOutlineEdit/></h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input  
                        className="form-control" 
                        id="name-no-editable"
                        name="nombre"
                        value={this.state.form.nombre} 
                        type="text" readOnly='true' onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido: </label>
                        <input 
                        className="form-control" 
                        name="apellido" 
                        value={this.state.form.apellido} 
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>País: </label>
                        <input 
                        className="form-control" 
                        name="pais"
                        value={this.state.form.pais}  
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email: </label>
                        <input 
                        className="form-control" 
                        name="email" 
                        value={this.state.form.email} 
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>DNI: </label>
                        <input 
                        className="form-control" 
                        name="dni" 
                        value={this.state.form.dni} 
                        type="text" onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary"
                     onClick={()=>this.editar(this.state.form)}>Editar</Button>
                    <Button color="danger"
                     onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default TableUsers;