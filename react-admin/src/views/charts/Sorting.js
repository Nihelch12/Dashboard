import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';
import { Table } from 'antd';

function Sorting() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
  /*  const [page , setPage] =  useState(1);
    const [pageSize, setPageSize] = useState(1) */
    
    const columns = [
    
        {
            key: "1",
            title: 'Icon',
            dataIndex: 'icon', 
            render: icon =>{
      return  <img
          width="150" height="150"
          src={icon} alt={icon} />
    }
            },

        {
            key: "2",
            title: 'Name',
            dataIndex: 'name',
            sorter : (record1,record2)=> {
                return record1.name> record2.name
            }
        },
      

        {
            key: "3",
            title: 'Status',
            dataIndex: 'status',
            
            
            
            
            filters:[
                {text: 'Activé', value:true},
                {text: 'Désactivé',value: false}
            ]

        },

       
    ]


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/gamelist")
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