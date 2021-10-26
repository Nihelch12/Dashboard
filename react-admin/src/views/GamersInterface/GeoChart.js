import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import * as i18nIsoCountries from "i18n-iso-countries";
import axios from "axios";

export default function GeoChart() {
  const [Resultat, setResultat] = useState([]);
  // i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  // var countries = require("i18n-iso-countries");
  useEffect(() => {
    axios.get("http://localhost:8000/api/geomap").then(response => {
      console.log(response.data);
      const tab = [["Country", "Number"]];
      response.data.forEach(item => {
        const data = [
          // countries.getName(item._id.country, "en", { select: "official" }),
          item._id.country,
          item.count
          
        ];
        tab.push(data);
      });
      setResultat(tab);
    });
  }, []);

  return (
    <Chart
      width={"960px"}
      height={"550px"}
      chartType="GeoChart"
      data={Resultat}
      mapsApiKey="YOUR_KEY_HERE"
      rootProps={{ "data-testid": "1" }}
    />
  );
}
