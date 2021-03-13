import React from 'react';
import {Bar} from 'react-chartjs-2'

function Graphic(){

    const data={
        labels:['CPU', 'RAM', 'Internet'],
        datasets:[{
            label:'Uso de: ',
            backgroundColor:'rgba(58,120,254,1)',
            borderWidth:1,
            hoverBackgroundColor:'rgba(58,120,254,0.7)',
            hoverBorderColor:'#000',
            data:[410,2050,2540]
        }]
    };
    const opciones={
        maintainAspectRatio: false,
        responsive: true
    }
    
        return(
            <div style={{margin:'auto', width:'80%', height:'400px'}}>
            <Bar data={data} options={opciones}/>
            </div>
        );
}

export default Graphic;