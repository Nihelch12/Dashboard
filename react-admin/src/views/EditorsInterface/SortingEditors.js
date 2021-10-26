import React, { useEffect, useState } from 'react'

import 'antd/dist/antd.css';
import { Table } from 'antd';

function SortingEditors() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const columns = [
    
      

        {
            key: "1",
            title: 'First name',
            dataIndex: 'first_name',
            sorter : (record1,record2)=> {
                return record1.first_name> record2.first_name
            }
        },
      

        {
            key: "2",
            title: 'Last name',
            dataIndex: 'last_name',
            sorter : (record1,record2)=> {
                return record1.last_name> record2.last_name
            }
        

        },
        {
            key: "3",
            title: 'Email',
            dataIndex: 'email',
            sorter : (record1,record2)=> {
                return record1.email> record2.email
            }
        

        },

       
    ]


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/editorsList")
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
 />



               
            </header>


        </div>
    )
}
export default SortingEditors;