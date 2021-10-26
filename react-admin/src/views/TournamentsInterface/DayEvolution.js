import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const DayEvolution = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let day = [];
    let number = [];
    axios
      .get("http://localhost:8000/api/dayline")
      .then(res => {
        console.log(res.data[0]);
        for (const dataObj of res.data) {
          day.push(parseInt(dataObj._id.jour));
          number.push(parseInt(dataObj.number));
         // console.log(number)
        }
        setChartData({
          labels: number,
          datasets: [
            {
              label: "Jour",
              data: day,
              backgroundColor: ["rgba(62, 300, 92, 0.6)"],
              borderWidth: 5
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    //console.log(month, number);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <br></br>
<span className="h3">  L’évolution des nombre des tournois par jour
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
                    maxTicksLimit: 10,
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

export default DayEvolution;