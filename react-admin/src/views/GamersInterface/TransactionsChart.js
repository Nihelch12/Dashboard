import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const TransactionsChart = () => {
  const [chartData, setChartData] = useState({});


  const chart = () => {
    let type = [];
    let avg = [];
    axios
      .get("http://localhost:8000/api/transactions")
      .then(res => {
        console.log(res.data);
        for (const dataObj of res.data) {
          type.push(dataObj._id);
          avg.push(parseInt(dataObj.avgTrans));
          console.log(type)
        }
        setChartData({
          labels: type,
          datasets: [
            {
              label: "Moyenne",
              data: avg,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
            });
        
      })
      .catch(err => {
        console.log(err);
      });
  //  console.log(month, number);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <br></br>
<span className="h3">  L’évolution de nombre des transactions par mois
</span>
      <div>
        <Bar
          data={chartData}
          options={{
            scales: {
              xAxes: [{
                stacked: true,
                ticks: {
                  //this will fix your problem with NaN
                  callback: function(label, index, labels) {
                    return label ? label : '';
                  }
                }
              }],
                y: {
                    beginAtZero: true
                }
            }
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsChart;