import React, {useState}  from 'react'
import "./message.css"
//import { sendMesaage } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { userRequest } from "../../requestMethods";
import { useNavigate } from 'react-router-dom';

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
  

function Chat({ messages, currentUser }) {
    const [replyMessage, setReplyMessage] = useState('');
   // const dispatch = useDispatch();
    const history = useNavigate();

    const handleReplySubmit = async () => {
        const newMessage = {
          senderId: currentUser._id,
          recipientId: messages[0].senderId === currentUser._id ? messages[0].recipientId : messages[0].senderId,
          message: replyMessage
        };
        try {
          const res = await userRequest.post("/message", newMessage);
          console.log(res.data);
          // do something with the response
        alert("message Sent");
        setReplyMessage(" ");
        history("/messages/")
        } catch (error) {
          console.error(error);
        }
      };

    //console.log(messages)
    return (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
               <div
               className={`chat-message ${message.senderId.isAdmin ? 'received' : 'sent'}`}
                key={message._id}
              >
                   <div className="chat-message-text">{message.message}</div>
            <div className="chat-message-timestamp">{formatTimestamp(message.createdAt)} by {message.senderId.username}</div>
              </div>
            ))}
          </div>
          <div className="chat-reply-container">
                <input className="chat-reply-input"
                type="text"
                placeholder="Type your reply"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button className="chat-reply-button" 
                onClick={handleReplySubmit}>Send</button>
            </div>
        </div>
      );
    };
    
export default Chat;