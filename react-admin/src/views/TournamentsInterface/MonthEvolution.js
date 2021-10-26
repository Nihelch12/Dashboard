import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const MonthEvolution = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let month = [];
    let number = [];
    axios
      .get("http://localhost:8000/api/monthline")
      .then(res => {
        console.log(res.data[0]);
        for (const dataObj of res.data) {
          month.push(parseInt(dataObj._id.mois));
          number.push(parseInt(dataObj.number));
         // console.log(number)
        }
        setChartData({
          labels: number,
          datasets: [
            {
              label: "Mois",
              data: month,
              backgroundColor: ["rgba(20, 100, 192, 0.6)"],
              borderWidth: 4
            }
          ]
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
<span className="h3">  L’évolution des nombre des tournois par mois
</span>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default MonthEvolution;