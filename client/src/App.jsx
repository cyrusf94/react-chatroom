import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import AddDelete from './components/Room/AddDelete/AddDelete';
import Room from './components/Room/Room';
import Messages from './components/Messages/Messages';
import Input from './components/Input/Input';

function App() {
  //  state variables/props -----------------------------------------//
  // roomName gets updated here and can be used to label messages "room"
  const [roomName, setRoomName] = useState("")
  // holds the name and id of the user that logged in to help track use see Auth line 64
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState("")
  const [ data, setData ] = useState("")
  // ! login/register ----------------------------------------------//
  const [sessionToken, setSessionToken] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  })

    // adds token and username to local storage
  function updateLocalStorage(newToken, newUserName, newUserId) {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
    localStorage.setItem("user-name", newUserName)
    setUserName(newUserName)
    localStorage.setItem("id", newUserId)
    setUserId(newUserId)
  }

  const handleView = () => {
    if (!sessionToken || sessionToken === "undefined") {
      return <Auth updateLocalStorage={updateLocalStorage} userName={userName} setUserName={setUserName} setUserId={setUserId}/> 
    } else {
      return <>
      <div className='landing-page'>
      <div id="rooms-list">
        <Room sessionToken={sessionToken} setRoomName={setRoomName}/>
        <AddDelete sessionToken={sessionToken} setRoomName={setRoomName}/>
      </div>
      <div id="message-div">
        <Messages sessionToken={sessionToken} roomName={roomName} userName={userName} userId={userId}/>
        <Input setData={data} sessionToken={sessionToken} roomName={roomName} />
      </div>
      </div>
    </>
    }
  }
  // ! Logout------------------------------------------------------//
  const logout = () => {
    localStorage.clear()
    setSessionToken("")
    setUserName("")
  }
  return (
    <>
    <Header roomName={roomName} logout={logout} />
    <div id='main-container'>
      {handleView()}
    </div>
    </>
  );
}

export default App;
