import { Chart } from "react-google-charts";
import * as React from "react";
import { render } from "react-dom";
import { useEffect, useState } from 'react';
// import * as i18nIsoCountries from 'i18n-iso-countries';
import axios from "axios";

class GeoChart extends React.Component {
  
  constructor(props) {
      super(props)
        this.state = {
          nom: [],
          nombre:[]
                }
        }
   
        
    componentDidMount(){
      //Get all chart details
      axios.get('http://localhost:8000/api/geomap').then(res => 
      {
        for (var i=0;i<res.data.length;i++){
        //  console.log(res.data[i]._id.country)
         // console.log(res.data[i].count)
        } 
        
      //Storing users detail in state array object
      for (var i=0;i<res.data.length;i++){
      this.setState({nom:res.data[i].country});
      this.setState({nombre:res.data[i].count}); }
     // console.log(this.state.number[i]) 
         }); 
        
     
      
      }
      
  

render() {

  // i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  // console.log(i18nIsoCountries.getName("cz", "en", {select: "official"})); 

  return (
    <Chart
  width={'500px'}
  height={'300px'}
  chartType="GeoChart"
  data={[
    ['Country', 'Popularity'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700],
  ]}
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey="YOUR_KEY_HERE"
  rootProps={{ 'data-testid': '1' }}
/>
  );



}
}
export default GeoChart;
