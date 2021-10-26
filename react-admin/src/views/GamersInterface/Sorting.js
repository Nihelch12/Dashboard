import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';
import { Table } from 'antd';

function Sorting() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    /*  const [page , setPage] =  useState(1);
      const [pageSize, setPageSize] = useState(1) */

    const columns = [

        // {
        //     key: "1",
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     render: avatar => {
        //         return <img
        //             width="50" height="50"
        //             src={avatar} alt={avatar} />
        //     }
        // },

        {
            key: "2",
            title: 'Username',
            dataIndex: 'username',
            sorter: (record1, record2) => {
                return record1.username > record2.username
            }
        },

        {
            key: "3",
            title: 'Email',
            dataIndex: 'email',
            sorter: (record1, record2) => {
                return record1.email > record2.email
            }
        },

       
      


    ]


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/gamerslist")
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