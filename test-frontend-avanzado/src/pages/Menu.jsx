import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Cookies from "universal-cookie";
import TableUsers from '../components/TableUsers'
import Graphic from './../components/Graphic'
import CircleGraphic from './../components/CircleGraphic'
import {Button} from 'reactstrap'
import './../css/Menu.css'

const cookies = new Cookies();

class Menu extends Component {
    state = {};
      constructor(){
        super()
        this.state={
          show:false,
          showGrap:true,
          showGrap2:false
        }
      }


  handleModalClose() {
    this.setState({ show: !this.state.show });
  }

  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellido", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("username", { path: "/" });
    this.handleModalClose();
    let redirect_Page = () => {
      let tID = setTimeout(function () {
        window.location.href = "./";
        window.clearTimeout(tID); // clear time out.
      }, 3000);
    };
    redirect_Page();
  };

  operation(){
    this.setState({
      showGrap:!this.state.showGrap,
      showGrap2: !this.state.showGrap2
    })
  }

  render() {
    return (
      <div>
        <div container style={{ fontSize: "1.4em", textAlign: "center" }}>
          <br />
          <Modal show={this.state.show}>
          <Modal.Header>¡Gracias, hasta la próxima!</Modal.Header>
          <Modal.Body>
            Será redireccionado a la pantalla de login...
          </Modal.Body>
          <Modal.Footer />
        </Modal>
        <h1>Lista de usuarios</h1>
        <div id="table">
        <TableUsers/>
        </div>
       <br/>
        <Button color="primary" onClick={()=>{this.cerrarSesion()}}>Cerrar Sesión</Button>
        </div>
        <br/>
        <h2 style={{textAlign:'center'}}>Gráficos</h2>
        <br/>
        <Button 
        onClick={()=>this.operation()}
        color="success" style={{marginLeft:'11%', borderRadius:'14px 14px 14px 14px'}}>
          Cambiar de Gráfico
          </Button>
        <br/>
        {
          this.state.showGrap?
          <div id="grap">
          <Graphic />
          </div>
          :null
        }
        {
          this.state.showGrap2?
          <div id="grap-circ">
          <CircleGraphic />
          </div>
          :null
        }
        
      </div>
      
    );
  }
}

export default Menu;
