import React, { useState } from 'react'
import "./AddDelete.css"

function AddDelete({ sessionToken, setRoomName }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [addedUsers, setAddedUsers] = useState([])
    const [create, setCreate] = useState(true)
    

    // button that will change to a create room form
    const handleCreate = () => {
      return create ? <div id="create" onClick={e => setCreate(!create)}>Create Room</div>
              :  <>
              <input
                className='inputs'
                type="text"
                id="room-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter room name'
              />
              <input
                className='inputs'
                type="text"
                id="room-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Enter room description'
              />
              <span id='create-cancel'>
              <button id='create' onClick={e => {
                  e.preventDefault()
                  createRoom()
                  setName("")
                  setDescription("")
                  setCreate(!create)
                  setRoomName(name)
              }}>Create</button>
              <div id='cancel' onClick={e => {
                  e.preventDefault()
                  setName("")
                  setDescription("")
                  setCreate(!create)
              }}>Cancel</div>
              </span>
            </>
    }

    // handles the input of creation form
    const createRoom = e => {
      const url = "http://127.0.0.1:4000/room/create"

      const body = {
        "name": name,
        "description": description,
        "addedUsers": addedUsers
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
            "Content-Type": "application/json",
            "authorization": sessionToken
  
        })
      })
      .then(res => res.json())
      .catch(err => console.log(err))
  }
    
    return (
      <>
      <form action="" id='create-form'>
        {handleCreate()}
      </form>
      </>
    )
}

export default AddDelete