import React, { Component } from "react";
import "./../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import { Button,Modal } from 'react-bootstrap'

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  constructor(){
    super()
    this.state={
      show:false
    }
  }

  handleModalSuccess(){
    this.setState({show:!this.state.show})
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    await axios.get(baseUrl, { params: { 
      username: this.state.form.username, 
      password: md5(this.state.form.password),},
      })
      .then(response => {
        return response.data;
      })
      .then(response=>{ 
        if(response.length>0){
          var respuesta = response[0];
          cookies.set('id', respuesta.id, {path:"/"});
          cookies.set('apellido', respuesta.apellido, {path:"/"});
          cookies.set('nombre', respuesta.nombre, {path:"/"});
          cookies.set('username', respuesta.username, {path:"/"});
          this.handleModalSuccess();
          let redirect_Page = () => {
            let tID = setTimeout(function () {
                window.location.href = "./menu";
                window.clearTimeout(tID);	}, 5000);
        }
        redirect_Page();
        }else{
          alert("Datos incorrectos...");
        }
    })
      .catch(error => {});
  };
  
  render() {
    return (
      <div className="containerPrincipal">
        <Modal show={this.state.show}>
            <Modal.Header>¡Bienvenido!</Modal.Header>
          <Modal.Body>Será redireccionado a la pantalla de inicio...</Modal.Body>
          <Modal.Footer/>
          <Button onClick={()=>{this.handleModalSuccess()}}>Continuar</Button>
        </Modal>
        
        <div className="containerSecundario">
          <label>Inicio de sesión</label>
            <br />
            <br />
          <div className="form-group">

            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange} />
            <br />

            <label>Contraseña: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange} />
            <br />
            <button 
            className="btn btn-primary" 
            onClick={()=> this.iniciarSesion()}> Ingresar </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
