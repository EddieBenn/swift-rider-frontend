import "./Chat.css"
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import * as SocketIOClient  from "socket.io-client";
import modalStyle from './Modal2.module.css'
interface Types{
    socket:string,
    username:string,
    room:string
}

const Chat = () => {
   
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Record<string, any>>({});
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat]= useState(false)
 

  //function to be called whenever the button is clicked

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

     
    }
  };


 
  return (
    <div className="chat-window">
        <div className="chat-window__overlay"></div>
      <div className="chat-header">
        <p>LIVE CHAT</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
            <div
              className="message"
              id= "other"
            >
              <div>
                  <div className="message-content"> 
                  
                    <p>This is the message content</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">2:00:00</p>
                    <p id= "author">Chika Nwobi</p>
                  </div>
              </div>
            </div>
          
     
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
        //   value="currentMessage"
          placeholder="type message here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress ={(event)=>{event.key ==="Enter" && sendMessage()  }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      
    </div>
  );
}

export default Chat;
