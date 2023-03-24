import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { format } from "timeago.js";
import { userRequest } from "../../requestMethods";
import "./transactionList.css"
import { Link } from "react-router-dom";






function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${formattedHours}:${minutes} ${amOrPm} - ${day}/${month}/${year}`;
}





export default function TransactionList() {
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(13);


  useEffect(()=>{
    const getOrders = async()=>{
      try{
        const res = await userRequest.get("orders");
        const sortedOrders = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setOrders(sortedOrders)

      }catch(err){
        console.log(err);
      }
    }
    getOrders();
  },[])
  
 // console.log(orders)
  
  const columns = [
    { field: "_id", headerName: "Order  ID", width: 220 },

    {
        field: 'user',
        headerName: 'User',
        width: 150,
        renderCell: (params) => <span>{params.row.userId.username}</span>,
      },

   
    { field: "total", headerName: "Total", width: 150 },
    { field: "delivery_status", headerName: "Delivery Status", width: 200 },
    { field: "payment_status", headerName: "Payment Status", width: 200 },
    {
      field: "createdAt",
      headerName: "Ordered AT",
      width: 200,
      renderCell: (params) => formatTimestamp(new Date(params.row.createdAt)),
    },
    {
      field: "updatetAt",
      headerName: "Last update",
      width: 200,
      renderCell: (params) => format(new Date(params.row.updatedAt)),
    },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/transaction/" + params.row._id}>
                <button className="transactionListEdit">View </button>
              </Link>
              
            </>
          );
        },
      },
];

return (
    <div className="transactionList">
      <DataGrid 
        rows={orders}
        columns={columns}
        rowsPerPageOptions={[5, 8, 13, 15, 25, 50]}
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={row => row._id} />
    </div>
  );
}
