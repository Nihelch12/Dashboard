import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';
import { Table } from 'antd';

function SuperAdmin() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
  

  


    

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/superadmin")
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
         super  admin page


        </div>
    )
}
export default SuperAdmin;