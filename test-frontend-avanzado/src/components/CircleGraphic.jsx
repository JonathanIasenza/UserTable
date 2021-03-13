import React from "react";
import { Pie } from "react-chartjs-2";

function CircleGraphic() {
  const data = {
    labels: ["CPU", "RAM", "Internet"],
    datasets: [
      {
        label: "Uso de: ",
        backgroundColor: ["rgb(15, 168, 225 )", "rgb(15, 225, 127 )", "rgb(249, 38, 4 )"],
        hoverBackgroundColor: ["rgba(15, 168, 225 ,0.7)", "rgba(15, 225, 127, 0.7)" , "rgba(249, 38, 4  ,0.7)"],
        hoverBorderColor: "#fff",
        data: [410, 2050, 2540],
      },
    ],
  };

  const opciones = {
    responsive: true,
  };

  return (
    <div className="pie-grap">
      <Pie data={data} options={opciones}/>
    </div>
  );
}

export default CircleGraphic;
