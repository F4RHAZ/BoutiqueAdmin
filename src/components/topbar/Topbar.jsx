import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Topbar (){
    const history = useNavigate();    
    const dispatch = useDispatch();


    function handleLogout() {
        // console.log(localStorage.getItem("persist:root"));
         localStorage.removeItem("persist:root");
         dispatch(logout());
         history('/');
         
      
       }

    return(
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer'}}>
                    THE CITY BOUTIQUE
                </span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone fontSize="large" />
                    <span className="topIconBadge">
                        
                    </span>
                </div>
                <div className="topbarIconContainer">
                    <Language fontSize="large"/>
                    <span className="topIconBadge">
                        
                    </span>
                </div>
{/*                 
                <div className="topbarIconContainer">
                    <Settings fontSize="large"/>
                </div> */}
                <div className="topbarIconContainer" onClick={handleLogout}>
                    <ExitToApp fontSize="large"/>
                </div>
                
                {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
                <img src="https://e7.pngegg.com/pngimages/306/70/png-clipart-computer-icons-management-admin-silhouette-black-and-white.png" alt="" className="topAvatar" />                
            </div>
        </div>
    </div>  
    );
}