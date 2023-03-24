import React from "react";
import { useSelector } from "react-redux";
//import { useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import Chat from "./Chat";

function Message() {

    const location = useLocation();
  const [messages, setMessages] = React.useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const senderId = location.pathname.split("/")[2];
  const recipientId = location.pathname.split("/")[3];


  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await userRequest.get(
          `/message/${senderId}/${recipientId}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [senderId, recipientId]);
  
    return <Chat messages={messages} currentUser={user} />;
  }
  
  export default Message;
