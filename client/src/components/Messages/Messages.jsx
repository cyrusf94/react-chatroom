import React, { useEffect, useState } from 'react'
import './Messages.css'
/* 
  * was thinking maybe the "addedUser" to the room array
  * could be done here once someone posts a message
    I stored the users name + id in the local storage 
*/
function Messages({ sessionToken, roomName, userName, userId}) {

  const [ messages, setMessages ] = useState([])

  const fetchMessages = () => {
    // url to fetch room name
    const url = `http://127.0.0.1:4000/message/room/${roomName}`
  
    fetch(url, {
      // GET request to get messages with that room name
      method: "GET",
      headers: new Headers({
        "Content-Type": "application.json",
        "authorization": sessionToken
      })
    })
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => console.log(err))
  }
  // useEffect to rerender the chat box when a room is selected
  useEffect(() => {
    if (roomName) {
      fetchMessages()
    }
  })
  // maps over the messages in that room name and displays them with the user and message body
  return (
    <>
    <div className="message-div">
      {messages.map((message, i) => (
        <div key={i} className='message-list'>
          <h3 id="user">{message.user}</h3>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Messages