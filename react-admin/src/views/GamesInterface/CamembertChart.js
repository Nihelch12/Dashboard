import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function CamembertChart({  }) {

    const [Res, setRes] = useState(true);
    const [Resultat, setResultat] = useState(true);

    useEffect(() => {
      axios.get("http://localhost:8000/api/gameAndr").then((response) => {
        setRes(response.data);
        console.log(response.data);
      });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/gameIos").then((response) => {
          setResultat(response.data);
          console.log(response.data);
        });
      }, []);


        return (
            <Chart

                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div><i class="fas fa-spinner"></i></div>}
                data={[
                    ['Version', 'number'],
                    ['android', Res],
                    ['ios', Resultat],

                ]}
                options={{
                    title: 'Nombre de jeux iOS / Android ',
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}

            />);


    }

