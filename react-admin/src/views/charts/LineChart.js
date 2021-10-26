/* import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

// class TrendLineChart extends React.Component {
  export default function LineChart() {

    const [Res, setRes] = useState(true);

    useEffect(() => {
      axios.get("http://localhost:8000/api/gamersLC").then((response) => {
        setRes(response.data);
        console.log(response.data);
      });
    }, []);
    


   return (
   
    <Chart
        width={'1000px'}
        height={'800px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}

        data=  { 
          Res.length >= 0 ? (Res.map((resultat) => {
            return( [
          ['x','y'],
          [resultat._id.mois,resultat.number]
                    ] );
          })) : (<div></div>)      }
        options={{
          hAxis: {
            title: 'Time',
          },
          vAxis: {
            title: 'Popularity',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
        
      />
    
      );
  }



  /* useEffect(() => {
    
    fetch("http://localhost:8000/api/gamersLC")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setDataLine(dataLine)
        }).catch(err => {
            console.log(err)
        })
  
  }, [])
  return(
    <div>
      {TrendLine()}
    </div>
  ) */

/* constructor(props) {
    super(props)
    this.state = {
      mois: [],
      number: []
    }
  }

  componentDidMount() {
    //Get all chart details
    axios.get('http://localhost:8000/api/gamersLC').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        //     console.log(res.data[i]._id.mois)
        console.log(res.data[i].number)
      }

      //Storing users detail in state array object
      for (var i = 0; i < res.data.length; i++) {
        var moisList = this.state.mois.concat(res.data[i]._id.mois)
        var numberList = this.state.number.concat(res.data[i].number)
        this.setState({ mois: moisList });
        this.setState({ number: numberList });
      }

      console.log(this.state.mois)
      console.log(this.state.number)
    });

  }

  */

  import React, { useState, useEffect } from "react";
  import { Line } from "react-chartjs-2";
  import axios from "axios";
  
  const LineChart = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);
  
    const chart = () => {
      let month = [];
      let number = [];
      axios
        .get("http://localhost:8000/api/gamersLC")
        .then(res => {
          console.log(res);
          for (const dataObj of res.data) {
            month.push(parseInt(dataObj._id.mois));
            number.push(parseInt(dataObj.number));
            console.log(number)
          }
          setChartData({
            labels: number,
            datasets: [
              {
                label: "Mois",
                data: month,
                backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                borderWidth: 4
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(month, number);
    };
  
    useEffect(() => {
      chart();
    }, []);
    return (
      <div className="App">
        <br></br>
<span className="h3">  L’évolution des nombre des jeux par mois
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
  
  export default LineChart;