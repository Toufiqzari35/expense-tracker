import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import './index.css';



const Records = () => {
    const [data, setdata] = useState([]);
    
    const getDataFromApi = () => {
        let token = '8b8682cf23fd2ead33e2d37f4060e88733fbff9b';
        axios.get(`http://localhost:8000/expenses/`, {
              headers: {
                'Authorization': `token ${token}`
              },
            })
            .then(res => {
              if (res.status === 200) {
                  console.log(res.data);
                  setdata(res.data);
              }
            })
            .catch ( error => {
                console.log(error);
            });
    };
    
    // const data = [
    //     {
    //         name : "Ramesh",
    //         age : "29"
    //     },
    //     {
    //         name : "Suresh",
    //         age : "30"
    //     }
    // ];
    
    const columns = [
        {
            title : "Category",
            field : "category.category_name"
        },
        {
            title : "Amount",
            field : "amount"
        },
        {
            title : "Note",
            field : "note"
        },
        {
            title : "Created at",
            field : "created_at"
        }
    ];
    
    
    
    useEffect( () => {
        getDataFromApi()
    }, []);


    return (
        <>
            <MaterialTable 
                title="All Records"
                data={data}
                columns={columns}
                editable
                options={{
                    rowStyle : {
                        backgroundColor : "#333867",
                        color : "#FFF"
                    },
                    headerStyle : {
                        backgroundColor : "#333867",
                        color : "#FFF",
                        fontWeight : "bold",
                        fontSize : "16px"
                    },
                }}
            />
        </>
    );
}


export default Records;