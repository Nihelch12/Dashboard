import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const DuelPerWeek = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let week = [];
    let number = [];
    axios
      .get("http://localhost:8000/api/weekline")
      .then(res => {
        console.log(res.data[0]);
        for (const dataObj of res.data) {
          week.push(parseInt(dataObj._id.semaine));
          number.push(parseInt(dataObj.number));
         // console.log(number)
        }
        setChartData({
          labels: number,
          datasets: [
            {
              label: "Semaine",
              data: week,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(month, number);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <br></br>
<span className="h3">  L’évolution des nombre des duels par semaine
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
                    maxTicksLimit: 15,
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

export default DuelPerWeek;