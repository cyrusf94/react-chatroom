import React, { useEffect, useState } from 'react'
import "./Room.css"

function Room({ sessionToken, setRoomName, setRoomUsers }) {

  const [rooms, setRooms] = useState([])

  const fetchRooms = () => {
    const url = "http://127.0.0.1:4000/room/"

    fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application.json",
          "authorization": sessionToken
      })
    })
    .then(res => res.json())
    .then(data => setRooms(data))
    .catch(err => console.log(err))
  }

  // gets initial list of rooms
  useEffect(() => {
    fetchRooms()
  })

  return (
    <>
    <div id='rooms-container'>
      {rooms.map((room, i) => (
        <div key={i} className='rooms-list'>
          <h3 onClick={e => {
            e.preventDefault()
            setRoomName(room.name)
          }}>{room.name}</h3>
        </div>
      ))}
    </div>
    </>
  )
}

export default Room