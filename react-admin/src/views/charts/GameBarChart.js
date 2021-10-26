import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function GameBarChart() {


  const [Res, setRes] = useState(true);
  const [Resultat, setResultat] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/andrv").then((response) => {
      setRes(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
      axios.get("http://localhost:8000/api/iosv").then((response) => {
        setResultat(response.data);
        console.log(response.data);
      });
    }, []);

  

        return (
          <Chart
          width={'700px'}
          height={'500px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['', 'Android', 'iOS'],
            ['1.0.1', Res, Resultat],
            
          ]}
          options={{
            title: 'Les versions de l’SDK utilisé par les jeux',
            chartArea: { width: '50%' },
            hAxis: {
              title: '',
              minValue: 0,
            },
            vAxis: {
              title: '',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '1' }}
        />);


    }
