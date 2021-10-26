import React, { useEffect, useState } from 'react'
import 'flag-icon-css/css/flag-icon.min.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import * as i18nIsoCountries from "i18n-iso-countries";

function Sorting() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    var countries = require("i18n-iso-countries");

    const columns = [
        

        {
            key: "1",
            title: 'Flag',
            dataIndex: ["_id", "country"],
            render: country => {
                return  <span className={`flag-icon flag-icon-${country}`} ></span>
            }
        },
        {
            key: "2",
            title: 'Country ',
            dataIndex: ["_id", "country"],
            sorter: (record1, record2) => {
                // countries.getName(item._id.country, "en", { select: "official" }),
                return  record1._id.country > record2._id.country
            }
        },

        {
            key: "3",
            title: 'Percentage',
            dataIndex: 'percentage',
            sorter: (record1, record2) => {
                return record1.percentage > record2.percentage
            }
        },

       
      


    ]


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/geomap")
            .then(response => response.json())
            .then(data => {
                //  console.log(data)
                setDataSource(data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })

    }, [])



    return (
        <div>
            <header>

                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
 /* pagination={{
     current: page,
     pageSize,
     total:50,
     onChange: ()=>{
         setPage(page);
         setPageSize(pageSize)
     }
 }} */ />




            </header>


        </div>
    )
}
export default Sorting;