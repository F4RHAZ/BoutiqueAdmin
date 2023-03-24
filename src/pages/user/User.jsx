import React from "react";
import {
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    SupervisorAccount,
  } from "@material-ui/icons";
  import { Link, useLocation } from "react-router-dom";
  import "./user.css";
  import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { DataGrid } from "@material-ui/data-grid";

  export default function User() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];    
    const [user, setUser]= useState([]);
    const [userOrders, setUserOrders]= useState([]);



    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await userRequest.get("/users/find/"+userId);
          setUser(res.data)
       //   console.log(res.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }, [userId]);

   // console.log(userId)

    useEffect(() => {
      const fetchUserOrders = async () => {
        try {
          const res = await userRequest.get("/users/fetchorders/"+ userId);
          setUserOrders(res.data)
        //  console.log(res.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserOrders();
    }, [userId]);



    //{userOrders && console.log(userOrders)}
//Order Table


const columns = [
  { field: "_id", headerName: "Order  ID", width: 220 },
  { field: "total", headerName: "Total", width: 150 },
  { field: "delivery_status", headerName: "Delivery Status", width: 200 },
  { field: "payment_status", headerName: "Payment Status", width: 200 },
 
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

function handleSubmit() {
  alert("OOPS! CAN'T CREATE Edit ACCOUNT!!");
}

//

    return (


      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">View User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {user && user.username}
                </span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                {user && user._id}
                </span>
              </div>
              {/* <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div> */}
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">
                {user && user.phone}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">
                {user && user.email}
                </span>
              </div>
              <div className="userShowInfo">
                <SupervisorAccount className="userShowIcon" />
                <span className="userShowInfoTitle">
                Admin? {user && user.isAdmin ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user && user.username}
                    className="userUpdateInput"
                  />
                </div>
                {/* <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder={user && user.username}
                    className="userUpdateInput"
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user && user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={user && user.phone}
                    className="userUpdateInput"
                  />
                </div>
             
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
              </div>
            </form>
          </div>
        </div>
       
        {userOrders && userOrders.length > 0 && (
        <div className="userorderlist" style={{ height: 400, marginTop: 10 }}>
          <DataGrid 
            rows={userOrders}
            columns={columns}
            getRowId={row => row._id} />
        </div>)}
      </div>
    );
  }