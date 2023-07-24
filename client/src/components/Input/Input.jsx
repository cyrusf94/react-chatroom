import React, { useState, useEffect } from 'react'
import './Input.css'

function Input({ roomName, sessionToken }) {
    // message useState()
    const [ message, setMessage ] = useState("")

    const createMessage = e => {
        // gets user name from local storage
        const user = localStorage.getItem("user-name")
        // url to send the data
        const url = "http://127.0.0.1:4000/Message/create"
        // data types sent
        const send = {
            "user": user,
            "room": roomName,
            "body": message
        }
        // post request to server
        fetch(url, {
            method: "POST",
            body: JSON.stringify(send),
            headers: new Headers({
                "Content-type": "application/json",
                "authorization": sessionToken
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }
  return (
    // assigns the message
    <form id="send-message" action="">
        <input id='field' type="text" value={message} onChange={e => setMessage(e.target.value)}/>
        <button id='send' onClick={e => {
            e.preventDefault()
            // clears the input field
            e.target.previousSibling.value = ''
            createMessage()
        }}>Send</button>
    </form>
  )
}

export default Input