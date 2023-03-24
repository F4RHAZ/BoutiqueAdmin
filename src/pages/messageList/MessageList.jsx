import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { format } from "timeago.js";
import { userRequest } from "../../requestMethods";
import "./messageList.css"
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


export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [pageSize, setPageSize] = useState(13);



  useEffect(()=>{
    const getMessages = async()=>{
      try{
        const res = await userRequest.get("message");
        setMessages(res.data)
        //console.log(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getMessages();
 
  },[])
  
  //console.log(messages)
  
  const columns = [
   
    {
        field: 'sender',
        headerName: 'Sender',
        width: 150,
        renderCell: (params) => <span>{params.row.sender && params.row.sender.username }</span>,
      },

    {
        field: 'recipient',
        headerName: 'Recipient',
        width: 150,
        renderCell: (params) => <span>{params.row.recipient && params.row.recipient.username}</span>,
      },

    { field: "message", headerName: "Message", width: 300 },

    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/message/"+params.row.sender._id+"/"+params.row.recipient._id}>
                <button className="messageListEdit">View </button>
              </Link>
              
            </>
          );
        },
      },
];

return (
  <>
  {messages.length > 0 ? (
    <div className="messageList">
      <DataGrid 
        rows={messages}
        columns={columns}
        rowsPerPageOptions={[5, 8, 10, 13, 15, 25]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={row => row._id} 
      />
    </div>
  ) : (
    <p>No messages found</p>
    )}
  </>
  );
}
