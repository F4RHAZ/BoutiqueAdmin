import React from "react";
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">
                        Dashboard
                    </h3>
                    {/* <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" fontSize="large"/>
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" fontSize="large"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" fontSize="large"/>
                            Sales
                        </li>
                    </ul> */}
                </div>
                <div className="SidebarMenu">
                    {/* <h3 className="sidebarTitle">
                        Quick Menu
                    </h3> */}
                    <ul className="sidebarList">
                    <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" fontSize="large"/>
                                Home
                            </li>
                        </Link>
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" fontSize="large"/>
                                Users
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" fontSize="large"/>
                                Products
                            </li>
                        </Link>
                        <Link to="/transactions" className="link">
                            <li className="sidebarListItem">
                                <AttachMoney className="sidebarIcon" fontSize="large"/>
                                Orders
                            </li>
                        </Link>

                        <Link to="/messages" className="link">
                            <li className="sidebarListItem">
                                <ChatBubbleOutline className="sidebarIcon" fontSize="large" />
                                Messages
                            </li>
                        </Link>
                        <Link to="/announcements" className="link">
                            <li className="sidebarListItem">
                                <RecordVoiceOverIcon className="sidebarIcon" fontSize="large" /> 
                                Announcements
                            </li>
                        </Link>
                    </ul>
                </div>
                {/* <div className="sidebarMenu">
                    <h3 className="sidebarTitle">
                        Staff
                    </h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" fontSize="large"/>
                            Manage
                        </li>
                        <li className="sidebarListIcon">
                            <Timeline className="sidebarIcon" fontSize="large"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" fontSize="large"/>
                            Reports
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}