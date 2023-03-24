import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

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


export default function UserList() {
  const [data, setData] = useState(userRows);
  const [users, setUsers] = useState();
  const [pageSize, setPageSize] = useState(10);

  useEffect(()=>{
  const getUsers = async()=>{
      try{
        const res = await userRequest.get("users");
        const usersWithId = res.data.map(user => ({...user, id: user._id}));
        setUsers(usersWithId);
      }catch(err){
        console.log(err);
      }
    }
    getUsers();
  },[pageSize])
  //console.log(users)

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  }; 
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Transaction Date",
      width: 200,
      renderCell: (params) => formatTimestamp(new Date(params.row.createdAt)),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">View</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
     {users && (
      <DataGrid
        rows={users}
        columns={columns}
        rowsPerPageOptions={[8, 10, 18, 20]}
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
      />
     )}
    </div>
  );
}