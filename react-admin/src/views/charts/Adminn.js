import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';
import { Table } from 'antd';

function Adminn() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
  

  


    

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/admin")
            .then(response => response.json())
            .then(data => {
                  console.log(data)
                setDataSource(data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })

    }, [])



    return (
        <div>
           admin page


        </div>
    )
}
export default Adminn;