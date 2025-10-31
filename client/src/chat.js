import React, { useEffect } from "react";
import {useState} from "react";


function Chat({socket,username,room}){
    const [currentMessage,setCurrentMessage]=useState([]);
    const [messageList,setmessageList]=useState([]);
    const sendMessage= async () => {
        if(currentMessage !==  ""){
            const messageData ={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+ new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message",messageData);


        }
    };

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
       
            setmessageList((list)=>[...list,data]);
        })},[socket]);

    return(
        <div className="chat-window">
            <div className="chat-header">
                <p>LIVE CHAT</p>
            </div>
            <div className="chat-body"></div>
            {messageList.map((messageContent) => {
                return <h1>{messageContent.message}</h1> })} 

            <div className="chat-footer">
                <input type="text" placeholder="HEY..." onChange={(event)=>{
                    setCurrentMessage(event.target.value);
                } } 
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        
         
        </div>
        
        
        
        
        
    )
}
export default Chat;